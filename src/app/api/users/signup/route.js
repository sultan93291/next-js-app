import { conncect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";
import Client from "@/models/userModel";
import bcrypt from "bcryptjs";

conncect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { username, password, email } = reqBody;
    const user = await Client.findOne({ email });
    if (user) {
      return new NextResponse(
        JSON.stringify(`message : user already existed`),
        {
          status: 400,
        }
      );
    }

    // hash password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Client({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // send email verification

    await sendEmail({
      email: email,
      emailType: `VERIFY`,
      userId: savedUser._id,
    });

    return new NextResponse(
      JSON.stringify({
        message: `User Created successfully`,
        success: true,
        savedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(error.stack), {
      status: 500,
    });
  }
}
