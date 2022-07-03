import { body } from "express-validator";
import { Request, Response, Router } from "express";
import { bloggersService } from "../domain/bloggers-service";
import {
  inputValidator,
  isValidBlog,
  isValidId,
  isValidPost,
  isValidPostByUri,
} from "../middlewares/input-validator-middlewares";
import { checkAuth } from "../middlewares/auth-middleware";
import { postsService } from "../domain/posts-service";



export const bloggersRouter = Router({});

bloggersRouter.get("/", async (req: Request, res: Response) => {
  const { SearchNameTerm, PageNumber = 1, PageSize = 10 } = req.query;
  //   console.log(SearchNameTerm);

  const bloggers = await bloggersService.getBloggers(
    SearchNameTerm,
    +PageNumber!,
    +PageSize!
  );
  res.status(200).send(bloggers);
});

bloggersRouter.get(
  "/:id",
  isValidId,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const blogger = await bloggersService.getBloggersById(id);
    if (blogger) {
      res.status(200).send(blogger);
    } else {
      res.sendStatus(404);
    }
  }
);
bloggersRouter.get(
  "/:id/posts",
  isValidId,
  inputValidator,
  async (req: Request, res: Response) => {
    const { PageNumber = 1, PageSize = 10 } = req.query;

    const id = req.params.id;
    const bloggerPosts = await bloggersService.getBloggersPostsById(
      id,
      +PageNumber!,
      +PageSize!
    );

    if (bloggerPosts) {
      res.status(200).send(bloggerPosts);
    } else {
      res.sendStatus(404);
    }
  }
);

bloggersRouter.put(
  "/:id",
  checkAuth,
  isValidBlog,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updBlogger = await bloggersService.updateBloggerById(
      id,
      req.body.name,
      req.body.youtubeUrl
    );
    if (updBlogger) {
      res.status(204).send(updBlogger);
    } else {
      res.sendStatus(404);
    }
  }
);

bloggersRouter.post(
  "/",
  checkAuth,
  isValidBlog,
  inputValidator,
  async (req: Request, res: Response) => {
    const newBlogger = await bloggersService.createBlogger(
      req.body.name,
      req.body.youtubeUrl
    );
    if (newBlogger) {
      res.status(201).send(newBlogger);
    } else {
      res.sendStatus(400);
    }
  }
);
bloggersRouter.post(
  "/:id/posts",
  checkAuth,
  isValidPostByUri,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const blogger = await bloggersService.getBloggersById(id);
    if (blogger) {
      const { title, content, shortDescription } = req.body;
      const newPost = await postsService.createPosts({
        title,
        content,
        bloggerId: id,
        shortDescription,
      });
      res.status(201).send(newPost);
    } else {
      res.sendStatus(404);
    }
  }
);

bloggersRouter.delete(
  "/:id",
  checkAuth,
  isValidId,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const isDeleted = await bloggersService.deleteBloggerById(id);
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);
