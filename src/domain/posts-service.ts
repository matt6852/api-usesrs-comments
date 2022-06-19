import { postsRepository } from "../repositories/posts-repository";
import { NewPost } from "../repositories/db";
import { bloggersService } from "./bloggers-service";
import { v4 as uuidv4 } from "uuid";

export const postsService = {
  async getPosts(
    PageNumber: number | undefined | null,
    PageSize: number | undefined | null
  ) {
    const posts = await postsRepository.getPosts(PageNumber, PageSize);
    return posts;
  },
  async getPostsById(id: string) {
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
      id: uuidv4(),
    };
    return await postsRepository.createPosts(createPost);
  },
  async updatePostsById(id: string, updatePost: NewPost) {
    return await postsRepository.updatePostsById({ id, ...updatePost });
  },
  async deletePostById(id: string) {
    return await postsRepository.deletePostById(id);
  },
};
