const { createHash } = require("node:crypto");
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("Before", request.body?.locked, request.bodyUsed);

    const { username, password } = await request.json();

    console.log("After", request.body?.locked, request.bodyUsed);
    const currentDate = new Date().toUTCString();

    const result = {
      Username: username,
      Created: currentDate,
    };

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.log(request.body?.locked);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
