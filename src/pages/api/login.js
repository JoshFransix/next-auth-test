import Cookies from "cookies";
import clientPromise from "../../lib/mongodb";
const { createHash } = require("crypto");

export default async function handler(req, res) {
  const formData = req.body;
  console.log(formData)
  const username = formData.username;
  const guess = formData.password;
  const client = await clientPromise;
  const db = client.db("nextjs-auth-test");
  const users = await db
    .collection("users")
    .find({ Username: username })
    .toArray();

  const user = users[0];
  const guess_hash = createHash("sha256").update(guess).digest("hex");
  if (guess_hash == user.Password) {
    return res.json({ status: 200, data: user });
  } else {
    return res.json({ status: 400, message: "An error occurred" });
  }
}
