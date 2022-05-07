import { bloggerCollection } from "./db";

type newBlogger = {
  name: string;
  youtubeUrl: string;
  id: number;
};
export const bloggersRepository = {
  async getAllBloggers(name: string) {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name };
    }
    const allBloggers = await bloggerCollection.find(filter).toArray();
    console.log(allBloggers);
    const redone = allBloggers.map((blogger: any) => {
      const newOne: any = {
        name: blogger.name,
        id: blogger.id,
        youtubeUrl: blogger.youtubeUrl,
      };
      return newOne;
    });

    return redone;
  },
  async createNewBBlogger(newBlogger: newBlogger) {
    const done = await bloggerCollection.insertOne(newBlogger);
    return done.acknowledged;
  },
  async deleteBlogger(id: number) {
    const isDeleted = await bloggerCollection.deleteOne({ id });
    return isDeleted.deletedCount >= 1;
  },
  async getSingleBlogger(id: number) {
    const singleBlogger = await bloggerCollection.findOne({ id });
    delete singleBlogger?._id;
    return singleBlogger;
  },
  async updatedSingleBlogger(id: number, updatedOne: object) {
    const isUpdated = await bloggerCollection.updateOne(
      { id },
      { $set: { ...updatedOne } }
    );
    return isUpdated.modifiedCount >= 1;
  },
};
