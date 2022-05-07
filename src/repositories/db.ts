import { MongoClient } from "mongodb";

const mongoUri = (process.env.mongoURI =
  "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority");

export const client = new MongoClient(mongoUri);

export const productsCollection = client.db("products").collection("products");
export const bloggerCollection = client
  .db("bloggers-posts-collection")
  .collection("bloggers");
export const postsCollection = client
  .db("bloggers-posts-collection")
  .collection("posts");
export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();

    console.log("Success");
    // Establish and verify connection
  } catch (err) {
    // Ensures that the client will close when you finish/error
    console.log(err);

    await client.close();
  }
}
