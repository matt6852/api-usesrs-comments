import { count } from "console";
import { Bloggers, bloggersCollection } from "./db";

export const bloggersRepository = {
  async getBloggers(
    search: string,
    PageNumber: number | undefined | null = 1,
    PageSize: number | undefined | null = 10
  ) {
    const searchQuery: any = {};
    if (search) {
      searchQuery.name = { $regex: search };
    }
    // console.log(searchQuery); git commit -am "make it better"   git push heroku master
    // console.log(+PageSize! * (+PageNumber! - 1), "skip");

    const bloggers = await bloggersCollection
      .find(searchQuery, { projection: { _id: 0 } })
      .skip(+PageSize! * (+PageNumber! - 1))
      .limit(+PageSize!)
      .toArray();
    const totalCount = await bloggersCollection.count();
    // console.log(totalCount, "totalCount");
    const result = {
      pagesCount: Math.ceil(totalCount / PageSize!),
      page: PageNumber,
      pageSize: PageSize,
      totalCount,
      items: bloggers,
    };

    return result;
  },
  async getBloggersById(id: number) {
    const bloggerById = await bloggersCollection.findOne({ id });
    if (bloggerById) {
      return {
        id: bloggerById.id,
        name: bloggerById.name,
        youtubeUrl: bloggerById.youtubeUrl,
      };
    } else {
      return false;
    }
  },
  async deleteBloggerById(id: number) {
    const delBlog = await bloggersCollection.deleteOne({ id });
    return delBlog.deletedCount === 1;
  },
  async updateBloggerById(id: number, name: string, youtubeUrl: string) {
    const updBlog = await bloggersCollection.findOneAndUpdate(
      { id },
      {
        $set: {
          name: name,
          youtubeUrl: youtubeUrl,
        },
      }
    );
    return updBlog.value;
  },
  async createBlogger(newBlogger: Bloggers) {
    await bloggersCollection.insertOne(newBlogger, {
      forceServerObjectId: true,
    });
    return newBlogger;
  },
};
