import { UserCreated } from "../domain/users-service";
import { usersCollection } from "./db";
import bcrypt from "bcrypt";

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
      .find({}, { projection: { _id: 0, password: 0, createdAt: 0 } })
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
    const delUser = await usersCollection.deleteOne({ id });
    return delUser.deletedCount === 1;
  },
  async findUser(user: any) {
    const found = await usersCollection.findOne({
      $or: [{ login: user.login }, { id: user }],
    });
    if (found) {
      console.log(user, "User");
      const result = await bcrypt.compare(user.password, found.password);
      console.log(result, "result");
      if (result) {
        return found;
      }
    }

    return null;
  },
  async findUserById(id: any) {
    const user = await usersCollection.findOne({ id });

    if (user) {
      return user;
    }
    return null;
  },
};
