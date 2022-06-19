import { body } from "express-validator";
import { Request, Response, Router } from "express";
import {
  inputValidator,
  isValidBlog,
  isValidId,
  isValidPost,
  isValidPostByUri,
} from "../middlewares/input-validator-middlewares";
import { checkAuth } from "../middlewares/auth-middleware";
import { postsService } from "../domain/posts-service";

export const authUserRouter = Router({});

authUserRouter.post("/login", async (req: Request, res: Response) => {});
