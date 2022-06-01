import { postsRepository } from "../repositories/posts-repository";
import { NewPost } from "../repositories/db";
import { bloggersService } from "./bloggers-service";

export const postsService = {
  async getPosts(
    PageNumber: number | undefined | null,
    PageSize: number | undefined | null
  ) {
    const posts = await postsRepository.getPosts(PageNumber, PageSize);
    return posts;
  },
  async getPostsById(id: number) {
    const post = await postsRepository.getPostsById(id);
    return post;
  },
  async createPosts(newPost: NewPost) {
    const blogger = await bloggersService.getBloggersById(newPost.bloggerId);
    if (!blogger) {
      return null;
    }
    const createPost = {
      ...newPost,
      bloggerName: blogger.name,
      id: +new Date(),
    };
    return await postsRepository.createPosts(createPost);
  },
  async updatePostsById(id: number, updatePost: NewPost) {
    return await postsRepository.updatePostsById({ id, ...updatePost });
  },
  async deletePostById(id: number) {
    return await postsRepository.deletePostById(id);
  },
};
