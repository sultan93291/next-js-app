import { conncect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Client from "@/models/userModel";

conncect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await Client.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          Message: ` Can't Verify You  `,
          success: false,
        }),
        { status: 400 }
      );
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    
    return new NextResponse(
      JSON.stringify(
        {
          message: "Email verified successfully",
          success: true,
        },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
