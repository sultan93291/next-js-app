import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function getDataFromToken(req) {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decToken = jwt.verify(token, process.env.SECRET_KEY);

    return decToken.id
    
  } catch (error) {
    throw new error("Error getting data from" + error.message);
  }
}
