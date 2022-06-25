import { commentsCollection, postsCollection, PostsCon } from "./db";

export const commentsRepository = {
  async getSingleCommentById(id: string) {
    const commentById = await commentsCollection.findOne(
      { id },
      { projection: { _id: 0 } }
    );

    if (commentById) {
      return {
        id,
        content: commentById.content,
        userId: commentById.userId,
        userLogin: commentById.userLogin,
        addedAt: commentById.addedAt,
      };
    } else {
      return false;
    }
  },
  async createcComment(createcComment: any) {
    await commentsCollection.insertOne(createcComment, {
      forceServerObjectId: true,
    });

    return createcComment;
  },
  async getUserCommentsByID(
    id: string,
    PageNumber: number | undefined | null = 1,
    PageSize: number | undefined | null = 10
  ) {
    const post = await postsCollection.findOne({ id });

    if (post) {
      const totalCount = await commentsCollection.countDocuments({
        postID: id,
      });
      const postComments = await commentsCollection
        .find({ postID: id }, { projection: { _id: 0 } })
        .skip(+PageSize! * (+PageNumber! - 1))
        .limit(+PageSize!)
        .toArray();

      return {
        pagesCount: Math.ceil(+totalCount / PageSize!),
        page: PageNumber,
        pageSize: PageSize,
        totalCount,
        items: postComments.map((comment) => {
          const mapped = {
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            userLogin: comment.userLogin,
            addedAt: comment.addedAt,
          };
          return mapped;
        }),
      };
    } else {
      return false;
    }
  },

  async updatePostsById(updatePost: PostsCon) {
    const id = updatePost.id;
    const updPosts = await commentsCollection.findOneAndUpdate(
      { id },
      { $set: { ...updatePost } },
      { upsert: true }
    );
    return updPosts.value;
  },

  async deletePostById(id: string) {
    const result = await commentsCollection.deleteOne({ id });
    return result.deletedCount === 1;
  },
};
