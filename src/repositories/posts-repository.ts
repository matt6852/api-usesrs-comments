import { postsCollection } from "./db";

type newBlogger = {
  name: string;
  youtubeUrl: string;
  id: number;
};
export const postsRepository = {
  async getAllPosts(title: any) {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    const allPosts = await postsCollection.find(filter).toArray();
    return allPosts;
  },
  async createNewPost(newPost: any) {
    const done = await postsCollection.insertOne(newPost);
    return done.acknowledged;
  },
  async deleteBlogger(id: number) {
    const isDeleted = await postsCollection.deleteOne({ id });
    return isDeleted.deletedCount >= 1;
  },
  async getSinglePost(id: number) {
    const singlePost = await postsCollection.findOne({ id });
    return singlePost;
  },
  async updatedSinglePost(id: number, updatedOne: object) {
    const isUpdated = await postsCollection.updateOne(
      { id },
      { $set: { ...updatedOne } }
    );
    return isUpdated.modifiedCount >= 1;
  },
};
