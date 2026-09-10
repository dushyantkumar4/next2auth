import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmails } from "@/helpers/mailer";

connectDB();
interface SignupReqBody {
  email: string;
  password: string;
  userName: string;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody: SignupReqBody = await request.json();
    const { email, password, userName } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 400 },
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    //send verification email
    await sendEmails({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message:"User registerd successfully",
      success:true,
      savedUser
    }) 

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
