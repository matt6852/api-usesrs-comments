import { isId } from "./../middleware/bloggers-middleware";
import { Request, Response, Router } from "express";
import { bloggerService } from "../domain/bloggers-service";
import { isBloggerValid } from "../middleware/bloggers-middleware";
import { postsService } from "../domain/posts-service";
import { send } from "process";
import {
  isCreatPostValid,
  isUpdatedPostValid,
} from "../middleware/posts-middleware";
import { basicAuth } from "../middleware/basic-aurh";

const postsRoute = Router({});

postsRoute
  .get("/", async (req: Request, res: Response) => {
    const { title } = req.query;
    const allPosts = await postsService.getAllPosts(title);
    res.send(allPosts);
  })
  .get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const singlePost = await postsService.singlePost(+id);
    if (singlePost) {
      return res.send(singlePost);
    } else return res.sendStatus(404);
  })
  .post(
    "/",
    basicAuth,
    isCreatPostValid,
    async (req: Request, res: Response) => {
      const { title, shortDescription, content, bloggerId } = req.body;
      const created = await postsService.createNewPost(
        title,
        shortDescription,
        content,
        bloggerId
      );
      if (created) {
        return res.sendStatus(201);
      }
      return res.sendStatus(404);
    }
  )
  .delete("/:id", basicAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const isDeleted = await postsService.delete(+id);
    if (isDeleted) {
      return res.sendStatus(204);
    }
    return res.sendStatus(404);
  })
  .put(
    "/:id",
    basicAuth,
    isUpdatedPostValid,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { title, shortDescription, content } = req.body;
      const updated = await postsService.updatePost(
        +id,
        title,
        shortDescription,
        content
      );
      if (updated) {
        return res.sendStatus(201);
      }
      return res.sendStatus(404);
    }
  );

export default postsRoute;
