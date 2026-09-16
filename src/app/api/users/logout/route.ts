import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout Successfully", success: true },
      { status: 200 },
    );
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error:error.message },
        { status: 500 },
      );
    }
  }
}
