import { isId } from "./../middleware/bloggers-middleware";
import { Request, Response, Router } from "express";
import { bloggerService } from "../domain/bloggers-service";
import { isBloggerValid } from "../middleware/bloggers-middleware";
import { basicAuth } from "../middleware/basic-aurh";
import { bearerAuth } from "../middleware/bearer-auth";

const bloggerRouter = Router({});

bloggerRouter
  .get("/", async (req: Request, res: Response) => {
    const { name } = req.query;
    const allBloggers = await bloggerService.getAllBloggers(name);
    res.send(allBloggers);
  })
  .get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const singleBlogger = await bloggerService.singleBlogger(+id);

    if (singleBlogger) {
      return res.send(singleBlogger);
    }
    return res.sendStatus(404);
  })
  .post(
    "/",
    basicAuth,
    bearerAuth,
    isBloggerValid,
    async (req: Request, res: Response) => {
      const { name, youtubeUrl } = req.body;
      const isCreated = await bloggerService.createNewBlogger(name, youtubeUrl);
      if (isCreated) {
        return res.status(201).send(isCreated);
      }
      return res.sendStatus(400);
    }
  )
  .delete(
    "/:id",
    basicAuth,
    bearerAuth,
    isId,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const isDeleted = await bloggerService.delete(+id);
      if (isDeleted) {
        return res.sendStatus(204);
      }
      return res.sendStatus(404);
    }
  )
  .put(
    "/:id",
    basicAuth,
    bearerAuth,
    isId,
    isBloggerValid,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, youtubeUrl } = req.body;
      const isUpdated = await bloggerService.updateBlogger(
        +id,
        name,
        youtubeUrl
      );
      if (isUpdated) {
        return res.sendStatus(204);
      }
      return res.sendStatus(404);
    }
  );

export default bloggerRouter;
