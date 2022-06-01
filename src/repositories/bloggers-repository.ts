import { count } from "console";
import { Bloggers, bloggersCollection, postsCollection } from "./db";

export const bloggersRepository = {
  async getBloggers(
    SearchNameTerm: string,
    PageNumber: number | undefined | null = 1,
    PageSize: number | undefined | null = 10
  ) {
    const searchQuery: any = {};
    if (SearchNameTerm) {
      searchQuery.name = { $regex: SearchNameTerm };
    }

    const bloggers = await bloggersCollection
      .find(searchQuery, { projection: { _id: 0 } })
      .skip(+PageSize! * (+PageNumber! - 1))
      .limit(+PageSize!)
      .toArray();
    const totalCount = await bloggersCollection.countDocuments(searchQuery);
    // console.log(searchQuery);
    // console.log(totalCount, "totalCount");
    const result = {
      pagesCount: Math.ceil(+totalCount / PageSize!),
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
  async getBloggersPostsById(
    id: number,
    PageNumber: number | undefined | null = 1,
    PageSize: number | undefined | null = 10
  ) {
    const bloggerById = await bloggersCollection.findOne({ id });
    console.log(bloggerById);

    if (bloggerById) {
      const totalCount = await postsCollection.countDocuments({
        bloggerId: id,
      });
      const bloggerPostsById = await postsCollection
        .find({ bloggerId: id }, { projection: { _id: 0 } })
        .skip(+PageSize! * (+PageNumber! - 1))
        .limit(+PageSize!)
        .toArray();
      console.log(bloggerPostsById, "bloggerPostsById");

      return {
        pagesCount: Math.ceil(+totalCount / PageSize!),
        page: PageNumber,
        pageSize: PageSize,
        totalCount,
        items: bloggerPostsById,
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
