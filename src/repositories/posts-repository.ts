import { postsCollection } from "./db";

type newBlogger = {
  name: string;
  youtubeUrl: string;
  id: number;
};
export const postsRepository = {
  async getAllPosts(title: any) {
    const filter: any = {};

    const allPosts = await postsCollection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    // const redone = allPosts.map((post: any) => {
    //   const newOne: any = {
    //     id: post.id,
    //     title: post.title,
    //     shortDescription: post.shortDescription,
    //     content: post.content,
    //     bloggerId: post.bloggerId,
    //     bloggerName: post.bloggerName,
    //   };
    //   return newOne;
    // });
    return allPosts;
  },
  async createNewPost(newPost: any) {
    const done = await postsCollection.insertOne(newPost, {
      forceServerObjectId: true,
    });
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
      title: singlePost.title,
      id: singlePost.id,
      shortDescription: singlePost.shortDescription,
      content: singlePost.content,
      bloggerId: singlePost.bloggerId,
      bloggerName: singlePost.bloggerName,
    };
    return createdOne;
  },
  async updatedSinglePost(id: number, updatedOne: object) {
    const isUpdated = await postsCollection.findOneAndUpdate(
      { id },
      { $set: { ...updatedOne } }
    );
    return isUpdated.value;
  },
};
