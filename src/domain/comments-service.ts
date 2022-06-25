import { commentsRepository } from "./../repositories/comments-repository";
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
export const comentsService = {
  async creatComment(data: any) {
    const postComment = {
      id: uuidv4(),
      content: data.content,
      userId: data.id,
      userLogin: data.login,
      addedAt: new Date(),
      postID: data.postID,
    };
    const result = await commentsRepository.createcComment(postComment);
    delete result.postID;
    return result;
  },
  async getUsercomment(id: any) {
    const result = await commentsRepository.getUserCommentsByID(id);

    return result;
  },
  async getCommentById(id: any) {
    const result = await commentsRepository.getSingleCommentById(id);

    return result;
  },
  async deleteCommentById(data: any) {
    // console.log(data, "data");

    const result = await commentsRepository.deletCommentById(data);

    return result;
  },
  async updateComment(data: any) {
    // console.log(data, "data");

    const result = await commentsRepository.updateComment(data);

    return result;
  },
};
