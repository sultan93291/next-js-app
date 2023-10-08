import { conncect } from "@/dbConfig/dbConfig";
import Client from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";



conncect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // check if user exist or not
    const user = await Client.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify(`Message:User does not exist  .Tap to Sign up `),
        { status: 400 }
      );
    }

    // check if the password is correct

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return new NextResponse(JSON.stringify(` Invalid password `), {
        status: 401,
      });
    } else {
      // create token data
      const tokendata = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      const token = await jwt.sign(tokendata, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      const response = new NextResponse(
        JSON.stringify({
          message: `Log in Successful`,
          Success: true,
        })
      );

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    }
  } catch (error) {
    return new Response(
      JSON.stringify(`Message:Server Side Problem,${error.message}`),
      {
        status: 500,
      }
    );
  }
}
