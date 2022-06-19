import { usersRepository } from "./../repositories/users-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../repositories/db";
import { v4 as uuidv4 } from "uuid";
const roundSalts = 10;

export type UserCreated = {
  id: string;
  login: string;
  password: string;
};
export const userService = {
  async creatUser(user: User) {
    const passwordHash = await bcrypt.hash(user.password, roundSalts);
    // console.log(passwordHash, "passwordHash");

    const newUser = {
      id: uuidv4(),
      login: user.login,
      password: passwordHash,
    };
    const createdUser = await usersRepository.createUser(newUser);
    return createdUser;
  },
  async getAllUsers(
    PageNumber: number | undefined | null,
    PageSize: number | undefined | null
  ) {
    return await usersRepository.getAllUsers(PageNumber, PageSize);
  },
  async deleteUserById(id: string) {
    return await usersRepository.deleteUserById(id);
  },
};
