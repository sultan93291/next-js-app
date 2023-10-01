import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Client from "@/models/userModel";
import { conncect } from "@/dbConfig/dbConfig";
conncect();

export async function GET(req) {
  try {
    const userId = await getDataFromToken(req);
    const user = await Client.findById({ _id: userId }).select(
      "-password "
    );
    return new NextResponse(JSON.stringify(
      {
        message: `Requested User Information`,
        data: user
      }
    ))
  } catch (error) {
    return new NextResponse(JSON.stringify(`${error.message}`), {
      status: 500,
    });
  }
}
