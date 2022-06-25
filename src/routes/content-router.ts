import { isValidComment } from "./../middlewares/input-validator-middlewares";
import { Request, Response, Router } from "express";
import { postsService } from "../domain/posts-service";
import { bloggersService } from "../domain/bloggers-service";
import {
  inputValidator,
  isValidId,
  isValidPost,
} from "../middlewares/input-validator-middlewares";
import { checkAuth, checkJWT } from "../middlewares/auth-middleware";
import { bloggersRepository } from "../repositories/bloggers-repository";
import { postsRepository } from "../repositories/posts-repository";
import { comentsService } from "../domain/comments-service";

export const postsRouter = Router();

postsRouter.get("/", async (req: Request, res: Response) => {
  const { PageNumber = 1, PageSize = 10 } = req.query;
  //   console.log(SearchNameTerm);

  const allPosts = await postsService.getPosts(+PageNumber, +PageSize);
  res.status(200).send(allPosts);
});

postsRouter.post(
  "/",
  checkAuth,
  isValidPost,
  inputValidator,
  async (req: Request, res: Response) => {
    const bloggerId = req.body.bloggerId;

    const blogger = await bloggersService.getBloggersById(bloggerId);
    if (!blogger) {
      res.status(400).send({
        errorsMessages: [{ message: "invalid", field: "bloggerId" }],
      });
      return;
    } else {
      const { title, content, shortDescription } = req.body;
      const newPost = await postsService.createPosts({
        title,
        content,
        bloggerId,
        shortDescription,
      });
      res.status(201).send(newPost);
    }
  }
);
postsRouter.post(
  "/:postId/comments",
  checkJWT,
  isValidComment,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.postId;
    if (!id) {
      res.sendStatus(404);
      return;
    }
    const post = await postsService.getPostsById(id);
    if (!post) {
      res.sendStatus(404);
    } else {
      const postComment = await comentsService.creatComment({
        ...req.body,
        ...req.user,
        postID: id,
      });
      // console.log(postComment, "comment without ID");

      res.status(201).send(postComment);
    }
  }
);
postsRouter.get(
  "/:postId/comments",
  checkJWT,
  async (req: Request, res: Response) => {
    const id = req.params.postId;
    if (!id) {
      res.sendStatus(404);
      return;
    }
    const post = await postsService.getPostsById(id);
    if (!post) {
      res.sendStatus(404);
    } else {
      const postComment = await comentsService.getUsercomment(id);

      res.send(postComment);
    }
  }
);

postsRouter.get(
  "/:id",
  isValidId,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
      res.sendStatus(404);
      return;
    }
    const post = await postsService.getPostsById(id);

    if (!post) {
      res.sendStatus(404);
    } else {
      res.status(200).send(post);
    }
  }
);

postsRouter.put(
  "/:id",
  checkAuth,
  isValidPost,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const findPost = await postsRepository.getPostsById(id);
    if (!findPost) {
      res.sendStatus(404);
      return;
    }

    const updPost = {
      title: req.body.title,
      content: req.body.content,
      shortDescription: req.body.shortDescription,
      bloggerId: req.body.bloggerId,
    };
    const bloggerUpd = await bloggersRepository.getBloggersById(
      updPost.bloggerId
    );
    if (!bloggerUpd) {
      res.status(400).send({
        errorsMessages: [{ message: "invalid", field: "bloggerId" }],
      });
      return;
    }

    const updatePost = await postsService.updatePostsById(id, updPost);
    if (!updatePost) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
      // console.log(updatePost);
    }
  }
);

postsRouter.delete(
  "/:id",
  checkAuth,
  isValidId,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const isDeleted = await postsService.deletePostById(id);
    if (!isDeleted) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  }
);
