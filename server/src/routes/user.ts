
import express, { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "./error";

const router = Router();

// User Registration Route
router.post("/register", async (req: Request, res: Response) => {
    // first we accept something that is come from the body of the request
    const { username, password } = req.body;

    try {
        // Check if username already exists
        // if they find a user with the user input username in UserModel collection they send it to user variable
        const user = await UserModel.findOne({ username });

        if (user) {
            res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
            return;  // Ensures function execution stops
        }

        // Hash the password before saving
        // hashing adds an extra layer of security to our app 
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create and save the new user
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: "User Registered Successfully" });

    } catch (err) {
        res.send(500).json({ type: err })
    }

});

// user login route
router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username }).lean<IUser>();
        // By default, findOne() returns a Mongoose document, which is a heavy object with built-in functions.
        // The .lean<IUser>() method converts it into a plain JavaScript object, improving performance.

        if (!user) {
            res.status(400).json({ type: UserErrors.NO_USER_FOUND })
            return;
        }

        // password == user.password;  here password is hashed and user.password is plain text so we also convert it to hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
            return;
        }

        // if password is valid and matches, everything is good then we starting creation of user
        //  we can first creating an user by creating a token(jsonwebtokens) for the user basically creating a secret version of the user then using it whenever user making a request , checking it that the user making the request is actual user to authenticate
        const token = jwt.sign ({id:user._id}, "secret");
        res.json({token, userID: user._id});


    } catch (err) {
        res.status(500).json({ type: err });
    }
});

export const verifyToken = ( req: Request, res: Response, next: NextFunction) => {
    // The function verifyToken is a middleware for verifying JSON Web Tokens (JWTs) in a Node.js/Express API. 
    // It ensures that incoming requests are authenticated before allowing access to protected routes.

    const authHeader = req.headers.authorization;
    // 1️⃣ What is req.headers?
    // req.headers is an object containing all the headers sent by the client in an HTTP request.
    // Headers provide metadata about the request, such as authentication tokens, content type, and origin.
    // 2️⃣ What is req.headers.authorization?
    // req.headers.authorization refers to the Authorization header in the request.
    // It is commonly used to send authentication credentials (like JWT tokens) from the client to the server.

    if(authHeader){
        // If authHeader is truthy (exists), the code inside the if block will execute.
        // If authHeader is undefined (not present), the code inside the if block is skipped.
        jwt.verify(authHeader,"secret", (err) => {  //(err) is a callback function of possible error
            if(err){
                return res.sendStatus(403);
            }
            next();
        });
    }
    return res.sendStatus(401);
};


export { router as userRouter }   //changing the name of router to userRouter, now to use it use the var called userRouter