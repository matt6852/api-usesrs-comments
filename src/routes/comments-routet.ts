import { comentsService } from "./../domain/comments-service";
import { checkJWT } from "./../middlewares/auth-middleware";
import { userService } from "./../domain/users-service";
import { body } from "express-validator";
import { Request, Response, Router } from "express";
import {
  inputValidator,
  isUserValid,
  isValidComment,
} from "../middlewares/input-validator-middlewares";
import { checkAuth } from "../middlewares/auth-middleware";
import { postsService } from "../domain/posts-service";
import { jwtService } from "../aplication/jwt-aplication";

export const commentsRouter = Router({});

commentsRouter.get("/:commentId", async (req: Request, res: Response) => {
  const id = req.params.commentId;
  if (!id) {
    res.sendStatus(404);
    return;
  }
  const comment = await comentsService.getCommentById(id);

  if (!comment) {
    res.sendStatus(404);
  } else {
    res.send(comment);
  }
});
commentsRouter.delete(
  "/:commentId",
  checkJWT,
  async (req: Request, res: Response) => {
    const id = req.params.commentId;
    if (!id) {
      res.sendStatus(404);
      return;
    }
    const exsist = await comentsService.getCommentById(id);
    if (exsist) {
      const comment = await comentsService.deleteCommentById({
        id,
        userId: req.user.id,
      });

      if (comment) {
        return res.sendStatus(204);
      }
      res.sendStatus(403);
    } else {
      res.sendStatus(404);
      return;
    }
  }
);
commentsRouter.put(
  "/:commentId",
  checkJWT,
  isValidComment,
  inputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.commentId;
    if (!id) {
      res.sendStatus(404);
      return;
    }
    const exsist = await comentsService.getCommentById(id);
    if (exsist) {
      const updatedComment = await comentsService.updateComment({
        id,
        userId: req.user.id,
        content: req.body.content,
      });

      if (updatedComment) {
        return res.sendStatus(204);
      }
      res.sendStatus(403);
    } else {
      res.sendStatus(404);
      return;
    }
  }
);
