import clientPromise from "../../lib/mongodb";
import Cookies from "cookies";
const { createHash } = require("crypto");

export default async function handler(req, res) {
  const formData = JSON.parse(req.body);
  const username = formData.username;
  const password = formData.password;
  const email = formData.email;


  const client = await clientPromise;
  const db = client.db("nextjs-auth-test");

  const password_hash = createHash("sha256").update(password).digest("hex");
  const currentDate = new Date().toUTCString();
  const bodyObject = {
    Username: username,
    Password: password_hash,
    Email: email,
    Created: currentDate,
  };
  await db.collection("users").insertOne(bodyObject);
  // cookies.set("user", bodyObject);
  return res.json({ status: 200, data: bodyObject });
}
