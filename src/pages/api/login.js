import Cookies from "cookies";
import clientPromise from "../../lib/mongodb";
const { createHash } = require("crypto");

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-auth-test");
  if (req.method == "POST") {
    const username = req.body["username"];
    const guess = req.body["password"];
    const users = await db
      .collection("users")
      .find({ Username: username })
      .toArray();
    if (users.length == 0) {
      res.redirect("/login?msg=Incorrect username or password");
      return;
    }
    const user = users[0];
    const guess_hash = createHash("sha256").update(guess).digest("hex");
    if (guess_hash == user.Password) {
      const cookies = new Cookies(req, res);
      cookies.set("user", username);
      res.redirect("/");
    } else {
      res.redirect("/login?msg=Incorrect username or password");
    }
  }
  if (req.method === "GET") {
    const allUsers = await db.collection("users").find({}).toArray();
    res.json({ status: 200, data: allUsers });
  }
}
