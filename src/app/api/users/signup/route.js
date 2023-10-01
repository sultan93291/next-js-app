import { conncect } from "@/dbConfig/dbConfig";
import Client from "@/models/userModel";
import bcrypt from "bcryptjs";

conncect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { username, password, email } = reqBody;
    const user = await Client.findOne({ email });
    if (user) {
      return new Response(JSON.stringify(`message : user already existed`), {
        status: 500,
      });
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
    console.log(savedUser);

    return new Response(
      JSON.stringify(`Message: Successfully created user ${savedUser} ` ),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify(`Message: Error creating user`, e.message),
      {
        status: 500,
      }
    );
  }
}
