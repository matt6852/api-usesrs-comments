import { bloggersRepository } from "../repositories/bloggers-repositiry";

export const bloggerService = {
  async getAllBloggers(name: any) {
    return await bloggersRepository.getAllBloggers(name);
  },
  async singleBlogger(id: number) {
    const singleBlogger = await bloggersRepository.getSingleBlogger(id);
    return singleBlogger;
  },
  async createNewBlogger(name: string, youtubeUrl: string) {
    const newBlogger = {
      id: +new Date(),
      name,
      youtubeUrl,
    };

    const created = await bloggersRepository.createNewBBlogger(newBlogger);
    return created;
  },
  async delete(id: number) {
    const isDeleted = await bloggersRepository.deleteBlogger(id);
    return isDeleted;
  },
  async updateBlogger(id: number, name: string, youtubeUrl: string) {
    const updatedOne = {
      name,
      youtubeUrl,
    };
    const isUpdated = await bloggersRepository.updatedSingleBlogger(
      id,
      updatedOne
    );
    return isUpdated;
  },
};
