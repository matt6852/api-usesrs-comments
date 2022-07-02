import {
  bloggersCollection,
  commentsCollection,
  postsCollection,
  usersCollection,
} from "./../repositories/db";
import { userService } from "../domain/users-service";
import { body } from "express-validator";
import { Request, Response, Router } from "express";
import {
  inputValidator,
  isUserValid,
} from "../middlewares/input-validator-middlewares";
import { checkAuth } from "../middlewares/auth-middleware";
import { postsService } from "../domain/posts-service";
import { jwtService } from "../aplication/jwt-aplication";

export const clearDBrouter = Router({});

clearDBrouter.delete("/all-data", async (req: Request, res: Response) => {
  await bloggersCollection.drop();
  await postsCollection.drop();
  await usersCollection.drop();
  await commentsCollection.drop();
  res.sendStatus(204);
});
