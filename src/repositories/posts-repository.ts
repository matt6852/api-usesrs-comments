import { postsCollection, PostsCon } from "./db";

export const postsRepository = {
  async getPosts(
    PageNumber: number | undefined | null = 1,
    PageSize: number | undefined | null = 10
  ) {
    const allPosts = await postsCollection
      .find({}, { projection: { _id: 0 } })
      .skip(+PageSize! * (+PageNumber! - 1))
      .limit(+PageSize!)
      .toArray();
    const totalCount = await postsCollection.countDocuments({});
    const result = {
      pagesCount: Math.ceil(+totalCount / PageSize!),
      page: PageNumber,
      pageSize: PageSize,
      totalCount,
      items: allPosts,
    };
    return result;
  },
  async getPostsById(id: number) {
    const postsById = await postsCollection.findOne(
      { id },
      { projection: { _id: 0 } }
    );
    if (postsById) {
      return {
        bloggerId: postsById.bloggerId,
        bloggerName: postsById.bloggerName,
        content: postsById.content,
        id,
        shortDescription: postsById.shortDescription,
        title: postsById.title,
      };
    } else {
      return false;
    }
  },
  async createPosts(createPost: PostsCon) {
    await postsCollection.insertOne(createPost, { forceServerObjectId: true });
    return createPost;
  },

  async updatePostsById(updatePost: PostsCon) {
    const id = updatePost.id;
    const updPosts = await postsCollection.findOneAndUpdate(
      { id },
      { $set: { ...updatePost } },
      { upsert: true }
    );
    return updPosts.value;
  },

  async deletePostById(id: number) {
    const result = await postsCollection.deleteOne({ id });
    return result.deletedCount === 1;
  },
};
