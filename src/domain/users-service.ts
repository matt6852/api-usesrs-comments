import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersRepository } from "../repositories/users-repository";

export interface BaseAuthData {
  login: string;
  password: string;
}

export const authService = {
  decodeBaseAuth(token: string): BaseAuthData {
    const buff = Buffer.from(token, "base64");

    const decodedString = buff.toString("ascii");

    const loginAndPassword = decodedString.split(":");
    console.log(loginAndPassword[0], loginAndPassword[1]);
    return {
      login: loginAndPassword[0],
      password: loginAndPassword[1],
    };
  },
};
