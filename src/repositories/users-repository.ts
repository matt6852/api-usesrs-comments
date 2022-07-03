import { UserCreated } from "../domain/users-service";
import { usersCollection } from "./db";
import bcrypt from "bcrypt";

export const usersRepository = {
  async createUser(createdNewUser: any) {
    await usersCollection.insertOne(createdNewUser, {
      forceServerObjectId: true,
    });
    return {
      id: createdNewUser.id,
      login: createdNewUser.login,
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
    // const delUser = await usersCollection.deleteOne({ id });
    return delUser.deletedCount === 1;
  },
  async findUser(user: any) {
    const found = await usersCollection.findOne({
      $and: [
        {
          "accountData.login": user.login,
          "emailConfirmation.isConfirmed": true,
        },
        { id: user },
      ],
    });
    console.log(found, "Found!!!");

    if (found) {
      const result = await bcrypt.compare(
        user.password,
        found.accountData.password
      );
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
  async checkExistingUser(chekUser: any) {
    const user = await usersCollection.findOne({
      $or: [
        {
          "accountData.login": chekUser.login,
        },
        {
          "accountData.email": chekUser.email,
        },
      ],
    });

    if (user) {
      return user;
    }
    return null;
  },
  async findUserByCode(code: any) {
    const user = await usersCollection.findOneAndUpdate(
      { "emailConfirmation.confirmCode": code },
      { $set: { "emailConfirmation.isConfirmed": true } }
    );

    if (user) {
      return user.value;
    }
    return null;
  },
};
