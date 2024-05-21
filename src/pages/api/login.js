import Cookies from "cookies";
import clientPromise from "../../lib/mongodb";
const { createHash } = require("crypto");

export default async function handler(req, res) {
  const client = await clientPromise;
  const formData = JSON.parse(req.body);
  const db = client.db("nextjs-auth-test");
  if (req.method == "POST") {
    const username = formData.username;
    const guess = formData.password;
    const users = await db
      .collection("users")
      .find({ Username: username })
      .toArray();

    const user = users[0];
    const guess_hash = createHash("sha256").update(guess).digest("hex");
    if (guess_hash == user.Password) {
      const cookies = new Cookies(req, res);
      cookies.set("user", username);
    } else {
  return res.json({ status: 400, message:'An error occurred' });
    }
  }
  // if (req.method === "GET") {
  //   const allUsers = await db.collection("users").find({}).toArray();
  //   res.json({ status: 200, data: allUsers });
  // }
}
