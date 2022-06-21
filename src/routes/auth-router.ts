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

export const authUserRouter = Router({});

authUserRouter.post(
  "/login",
  isUserValid,
  inputValidator,
  async (req: Request, res: Response) => {
    const { login, password } = req.body;

    const user = await userService.findUserById({ login, password });

    if (user) {
      const token = await jwtService.createJWT(user);
      res.send(token);
      return;
    }

    res.sendStatus(401);
  }
);
