import Cookies from "cookies";
import clientPromise from "../../lib/mongodb";
const { createHash } = require("crypto");

export default async function handler(req, res) {
  const formData = req.body;
  console.log(formData.username);
  const username = formData.username;
  const guess = formData.password;
  const guess_hash = createHash("sha256").update(guess).digest("hex");
  const client = await clientPromise;
  const db = client.db("nextjs-auth-test");
  const users = await db
    .collection("users")
    .find({ Username: username, Password: guess_hash })
    .toArray();

  const user = users[0];
  console.log(users);
  if (user) {
    if (guess_hash == user.Password) {
      return res.json({ status: 200, data: user });
    } else {
      return res.json({ status: 400, message: "An error occurred" });
    }
  } else {
    return res.json({ status: 400, message: "An error occurred" });
  }
}
