import { bloggersRepository } from "../repositories/bloggers-repository";
import { v4 as uuidv4 } from "uuid";

export const bloggersService = {
  async getBloggers(
    SearchNameTerm: any,
    PageNumber: number | undefined | null,
    PageSize: number | undefined | null
  ) {
    return await bloggersRepository.getBloggers(
      SearchNameTerm,
      PageNumber,
      PageSize
    );
  },
  async getBloggersById(id: string) {
    return await bloggersRepository.getBloggersById(id);
  },
  async getBloggersPostsById(
    id: string,
    PageNumber: number | undefined | null,
    PageSize: number | undefined | null
  ) {
    return await bloggersRepository.getBloggersPostsById(
      id,
      PageNumber,
      PageSize
    );
  },
  async deleteBloggerById(id: string) {
    return await bloggersRepository.deleteBloggerById(id);
  },
  async updateBloggerById(id: string, name: string, youtubeUrl: string) {
    return await bloggersRepository.updateBloggerById(id, name, youtubeUrl);
  },
  async createBlogger(name: string, youtubeUrl: string) {
    const newBlogger = {
      id: uuidv4(),
      name: name,
      youtubeUrl: youtubeUrl,
    };
    return await bloggersRepository.createBlogger(newBlogger);
  },
};
