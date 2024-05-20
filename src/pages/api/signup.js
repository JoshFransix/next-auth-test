const { createHash } = require("node:crypto");
import { NextResponse } from "next/server";

export default async function POST(request, res) {
  try {
    console.log("Before", request.body?.locked, request.bodyUsed);

    const { username, password, email } = await request.json();

    console.log("After", request.body?.locked, request.bodyUsed);
    const currentDate = new Date().toUTCString();

    const result = {
      Username: username,
      Created: currentDate,
      Email: email,
    };

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(request.body?.locked);
    return res.json({ error: "Internal Server Error" });
  }
}
