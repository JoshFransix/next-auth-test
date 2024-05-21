import clientPromise from "../../lib/mongodb";
import Cookies from "cookies";
const { createHash } = require("crypto");

export default async function handler(req, res) {
  const username = req.body["username"];
  const password = req.body["password"];
  const email = req.body["email"];

  const client = await clientPromise;
  const db = client.db("nextjs-auth-test");
  const users = await db
    .collection("users")
    .find({ Username: username })
    .toArray();
  if (users.length > 0) {
    return res.json({
      status: 400,
      message: "A user already has this username",
    });
  }
  const password_hash = createHash("sha256").update(password).digest("hex");
  const currentDate = new Date().toUTCString();
  const bodyObject = {
    Username: username,
    Password: password_hash,
    Created: currentDate,
  };
  await db.collection("users").insertOne(bodyObject);
  cookies.set("user", bodyObject);
  return res.json({ status: 200, data: bodyObject });
}
