import { MongoClient } from "mongodb";

const password = encodeURIComponent("Ayomikun,69");
const uri = `mongodb+srv://joshfransix:${password}@cluster0.cfhje1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Add Mongo URI to env file");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
