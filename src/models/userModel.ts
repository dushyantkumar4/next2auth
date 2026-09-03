import { Schema, model, Document, models } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPassToken: string;
  forgotPassExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: [true, "Please Provide the Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide the Email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please Provide the Password"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPassToken: String,
  forgotPassExpiry: Date,
});

const User = models.users || model<IUser>("users", userSchema);
export default User;
