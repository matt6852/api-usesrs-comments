import { UserCreated } from "../domain/users-service";
import { usersCollection } from "./db";

export const usersRepository = {
  async createUser(createPost: UserCreated) {
    await usersCollection.insertOne(createPost, { forceServerObjectId: true });
    return {
      id: createPost.id,
      login: createPost.login,
    };
  },
  async getAllUsers(
    PageNumber: number | undefined | null = 1,
    PageSize: number | undefined | null = 10
  ) {
    const users = await usersCollection
      .find({}, { projection: { _id: 0, password: 0 } })
      .skip(+PageSize! * (+PageNumber! - 1))
      .limit(+PageSize!)
      .toArray();
    const totalCount = await usersCollection.countDocuments({});
    const result = {
      pagesCount: Math.ceil(+totalCount / PageSize!),
      page: PageNumber,
      pageSize: PageSize,
      totalCount,
      items: users,
    };
    return result;
  },
  async deleteUserById(id: string) {
    const delBlog = await usersCollection.deleteOne({ id });
    return delBlog.deletedCount === 1;
  },
};
