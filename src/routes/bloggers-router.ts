import { isId } from "./../middleware/bloggers-middleware";
import { Request, Response, Router } from "express";
import { bloggerService } from "../domain/bloggers-service";
import { isBloggerValid } from "../middleware/bloggers-middleware";

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
  .post("/", isBloggerValid, async (req: Request, res: Response) => {
    const { name, youtubeUrl } = req.body;
    const isCreated = await bloggerService.createNewBlogger(name, youtubeUrl);
    if (isCreated) {
      return res.sendStatus(201);
    }
    return res.sendStatus(400);
  })
  .delete("/:id", isId, async (req: Request, res: Response) => {
    const { id } = req.params;
    const isDeleted = await bloggerService.delete(+id);
    if (isDeleted) {
      return res.sendStatus(204);
    }
    return res.sendStatus(404);
  })
  .put("/:id", isId, isBloggerValid, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, youtubeUrl } = req.body;
    const isUpdated = await bloggerService.updateBlogger(+id, name, youtubeUrl);
    if (isUpdated) {
      return res.sendStatus(201);
    }
    return res.send(404);
  });

export default bloggerRouter;
