import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import Client from "@/models/userModel";
import { conncect } from "@/dbConfig/dbConfig";

conncect()

export async function GET(request){

    try {
        const userId = await getDataFromToken(request);
        const user = await Client.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}