import { postsRepository } from "./../repositories/posts-repository";
import { bloggersRepository } from "../repositories/bloggers-repositiry";

export const postsService = {
  async getAllPosts(title: any) {
    return await postsRepository.getAllPosts(title);
  },
  async singlePost(id: number) {
    const singlePost = await postsRepository.getSinglePost(id);
    return singlePost;
  },
  async createNewPost(
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number
  ) {
    const exist = await bloggersRepository.getSingleBlogger(bloggerId);
    console.log("here");

    if (exist) {
      const newPost = {
        id: +new Date(),
        title,
        shortDescription,
        content,
        bloggerId,
        bloggerName: exist.name,
      };
      const done = await postsRepository.createNewPost(newPost);
      if (done) {
        return true;
      }
      return false;
    }
  },
  async delete(id: number) {
    const isDeleted = await postsRepository.deleteBlogger(id);
    return isDeleted;
  },
  async updatePost(
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number
  ) {
    const updatedOne = {
      title,
      shortDescription,
      content,
      bloggerId,
    };

    const isUpdated = await postsRepository.updatedSinglePost(id, updatedOne);
    return isUpdated;
    // }
  },
};
