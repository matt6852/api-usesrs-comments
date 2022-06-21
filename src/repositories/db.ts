import { settings } from "./../settings";
import { MongoClient } from "mongodb";

// const mongoUri =
//   process.env.MONGO_URI ||
//   "mongodb://localhost:27017/?maxPoolSize=20&w=majority";

export const client = new MongoClient(settings.MONGO_URI);
export const bloggersCollection = client
  .db("bloggers-posts")
  .collection("bloggers-management");
export const postsCollection = client
  .db("bloggers-posts")
  .collection("posts-management");
export const usersCollection = client.db("bloggers-posts").collection("users");

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("bloggers-posts").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export type PostsCon = {
  id: string;
  bloggerId: Bloggers["id"];
  title: string | null;
  shortDescription: string | null;
  content: string | null;
  bloggerName?: Bloggers["name"];
};

export type Bloggers = {
  id: string;
  name: string | null;
  youtubeUrl: string | null;
};

export type NewPost = {
  title: string | null;
  shortDescription: string | null;
  content: string | null;
  bloggerId: Bloggers["id"];
};
export type User = {
  login: string;
  password: string;
};

export type UpdPost = {
  id: string;
  title: string | null;
  shortDescription: string | null;
  content: string | null;
  bloggerId: PostsCon["bloggerId"];
};
