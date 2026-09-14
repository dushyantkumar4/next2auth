import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    //extract data from token 
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    // check if there is no user
    return NextResponse.json({message:"User found", data: user, success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
