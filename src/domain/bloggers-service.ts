import { bloggersRepository } from "../repositories/bloggers-repository";

export const bloggersService = {
  async getBloggers(
    SearchNameTerm: any,
    PageNumber: number | undefined | null,
    PageSize: number | undefined | null
  ) {
    // console.log(SearchNameTerm);

    return await bloggersRepository.getBloggers(
      SearchNameTerm,
      PageNumber,
      PageSize
    );
  },
  async getBloggersById(id: number) {
    return await bloggersRepository.getBloggersById(id);
  },
  async getBloggersPostsById(
    id: number,
    PageNumber: number | undefined | null,
    PageSize: number | undefined | null
  ) {
    console.log(PageSize, "form service");

    return await bloggersRepository.getBloggersPostsById(
      id,
      PageNumber,
      PageSize
    );
  },
  async deleteBloggerById(id: number) {
    return await bloggersRepository.deleteBloggerById(id);
  },
  async updateBloggerById(id: number, name: string, youtubeUrl: string) {
    return await bloggersRepository.updateBloggerById(id, name, youtubeUrl);
  },
  async createBlogger(name: string, youtubeUrl: string) {
    const newBlogger = {
      id: +new Date(),
      name: name,
      youtubeUrl: youtubeUrl,
    };
    return await bloggersRepository.createBlogger(newBlogger);
  },
};
