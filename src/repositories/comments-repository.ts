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
  async getUserCommentsByID(data: any) {
    const { id, PageNumber, PageSize } = data;
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
        page: +PageNumber,
        pageSize: +PageSize,
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

  async updateComment(updateComent: any) {
    const { id, userId, content } = updateComent;
    const updPosts = await commentsCollection.findOneAndUpdate(
      { id, userId },
      { $set: { content } },
      { upsert: true }
    );
    console.log(updPosts, "updPosts");

    return updPosts.value;
  },

  async deletCommentById(data: any) {
    console.log(data, "updPosts");

    const result = await commentsCollection.deleteOne({
      id: data.id,
      userId: data.userId,
    });
    // const result = await commentsCollection.deleteOne({ ...data });
    console.log(result, "result!!!");

    return result.deletedCount === 1;
  },
};
// git commit -am "make it better"
// git push heroku master
