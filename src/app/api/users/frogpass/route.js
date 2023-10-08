import { conncect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Client from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcrypt from "bcryptjs";

// Connect to the database
conncect();

export async function POST(req) {
  try {
    // Parse the request body
    const reqBody = await req.json();
    const { email, password, newpass, conpass } = reqBody;
    console.log(email);

    // Find the user by email
    const user = await Client.findOne({ email });

    // If user doesn't exist, return an error response
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          Message: `Couldn't find email address`,
          Success: false,
        }),
        { status: 400 }
      );
    }

    // Verify the provided password
    const validPassword = await bcrypt.compare(password, user.password);

    // If password is not valid, return an error response
    if (!validPassword) {
      return new NextResponse(
        JSON.stringify({
          Message: `Wrong credentials`,
          Success: false,
        }),
        { status: 400 }
      );
    }

    // If the new password and confirm password match, update the password
    if (newpass === conpass) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(conpass, salt);
      user.password = hashedPassword;
      user.isVerified = false;
      await user.save();
    }

    // Send a reset email
    await sendEmail({ email, emailType: `RESET`, userId: user._id });

    // Return a success response
    return new NextResponse(
      JSON.stringify({
        Message: `Successfully updated password`,
      })
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: error.message,
        Success: false,
      }),
      { status: 500 }
    );
  }
}
