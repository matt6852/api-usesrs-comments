import { userService } from "./../domain/users-service";
import { body } from "express-validator";
import { Request, Response, Router } from "express";
import {
  inputValidator,
  isUserValid,
} from "../middlewares/input-validator-middlewares";
import { checkAuth } from "../middlewares/auth-middleware";

export const usersRouter = Router({});

usersRouter.get("/", async (req: Request, res: Response) => {
  const { PageNumber = 1, PageSize = 10 } = req.query;
  const users = await userService.getAllUsers(+PageNumber!, +PageSize!);
  res.status(200).send(users);
});
usersRouter.post(
  "/",
  checkAuth,
  isUserValid,
  inputValidator,
  async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const createdUser = await userService.creatUser({ login, password });
    res.status(201).send(createdUser);
  }
);
usersRouter.delete("/:id", checkAuth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const isDeleted = await userService.deleteUserById(id);
  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
