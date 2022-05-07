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
    const redone = allPosts.map((post: any) => {
      const newOne: any = {
        id: post.id,
        shortDescription: post.shortDescription,
        content: post.content,
        bloggerId: post.bloggerId,
        bloggerName: post.bloggerName,
      };
      return newOne;
    });
    return redone;
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
    if (!singlePost) return null;
    const createdOne = {
      name: singlePost.title,
      id: singlePost.id,
      shortDescription: singlePost.shortDescription,
      content: singlePost.content,
      bloggerId: singlePost.bloggerId,
      bloggerName: singlePost.bloggerName,
    };
    return createdOne;
  },
  async updatedSinglePost(id: number, updatedOne: object) {
    const isUpdated = await postsCollection.updateOne(
      { id },
      { $set: { ...updatedOne } }
    );
    return isUpdated.modifiedCount >= 1;
  },
};
