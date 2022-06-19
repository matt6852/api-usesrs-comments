import { userService } from "./../domain/users-service";
import { body } from "express-validator";
import { Request, Response, Router } from "express";
import {
  inputValidator,
  isUserValid,
} from "../middlewares/input-validator-middlewares";
import { checkAuth } from "../middlewares/auth-middleware";
import { postsService } from "../domain/posts-service";

export const authUserRouter = Router({});

authUserRouter.post(
  "/login",
  isUserValid,
  inputValidator,
  async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const user = {
      login,
      password,
    };
    console.log(user, "USer ppost");

    const result = await userService.findUser(user);

    res.send(result);
  }
);
