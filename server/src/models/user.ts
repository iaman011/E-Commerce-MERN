import { Schema, model } from "mongoose";

// creating interfaces
export interface IUser {
    _id?: string;
    username: string;
    password: string;
    availableMoney: number;
    // purchasedItems: string[];

}

const UserSchema = new Schema<IUser>({
    username:{type: String, required: true, unique: true},
    password:{type:String, required: true },
    availableMoney:{type: Number, default: 5000},
});

export const UserModel = model<IUser>("user", UserSchema);