
import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user";
import { UserErrors } from "./error";

const router = Router();

 // User Registration Route
router.post("/register", async (req: Request, res: Response) => {
    // first we accept something that is come from the body of the request
    const {username, password} =req.body;

    try {
        // Check if username already exists
    // if they find a user with the user input username in UserModel collection they send it to user variable
    const user = await UserModel.findOne({username});

    if(user) {
        res.status(400).json({type : UserErrors.USERNAME_ALREADY_EXISTS});
        return;  // Ensures function execution stops
    }

      // Hash the password before saving
    // hashing adds an extra layer of security to our app 
    const hashedPassword = await bcrypt.hash(password, 10);
     // Create and save the new user
    const newUser = new UserModel({ username,password: hashedPassword});
    await newUser.save();

    res.json({message : "User Registered Successfully"});

} catch (err) {
    res.send(500).json ({ type: err})
}
    
});


export {router as userRouter}   //changing the name of router to userRouter, now to use it use the var called userRouter