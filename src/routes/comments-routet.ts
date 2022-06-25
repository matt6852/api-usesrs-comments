import { comentsService } from "./../domain/comments-service";
import { checkJWT } from "./../middlewares/auth-middleware";
import { userService } from "./../domain/users-service";
import { body } from "express-validator";
import { Request, Response, Router } from "express";
import {
  inputValidator,
  isUserValid,
} from "../middlewares/input-validator-middlewares";
import { checkAuth } from "../middlewares/auth-middleware";
import { postsService } from "../domain/posts-service";
import { jwtService } from "../aplication/jwt-aplication";

export const commentsRouter = Router({});

commentsRouter.get(
  "/:commentId",
  checkJWT,
  async (req: Request, res: Response) => {
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
  }

  // const user = await userService.findUser({ login, password });

  // if (user) {
  //   const token = await jwtService.createJWT(user);
  //   res.send(token);
  //   return;
  // }

  // res.sendStatus(401);
);
