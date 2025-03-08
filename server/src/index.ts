
import  express  from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/user';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

mongoose.connect(
    "mongodb+srv://iaman011:ecommercepassword@ecommerce.twjn9.mongodb.net/ecommerce"
);


const port = 3001;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})