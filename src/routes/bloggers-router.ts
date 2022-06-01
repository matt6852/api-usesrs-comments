import { body } from "express-validator";
import { Request, Response, Router } from "express";
import { bloggersService } from "../domain/bloggers-service";
import {
  inputValidator,
  isValidBlog,
  isValidId,
} from "../middlewares/input-validator-middlewares";
import { checkAuth } from "../middlewares/auth-middleware";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/;

export const bloggersRouter = Router({});

bloggersRouter.get("/", async (req: Request, res: Response) => {
  const { search } = req.query;
  console.log(search);

  const bloggers = await bloggersService.getBloggers(search);
  res.status(200).send(bloggers);
});

bloggersRouter.get(
  "/:id",
  isValidId,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = +req.params.id;
    const blogger = await bloggersService.getBloggersById(id);
    if (blogger) {
      res.status(200).send(blogger);
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
    const id = +req.params.id;
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

bloggersRouter.delete(
  "/:id",
  checkAuth,
  isValidId,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = +req.params.id;
    const isDeleted = await bloggersService.deleteBloggerById(id);
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);
