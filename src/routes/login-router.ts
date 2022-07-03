import { userService } from "../domain/users-service";

import { Request, Response, Router } from "express";
import {
  inputValidator,
  isUserValidRegistration,
} from "../middlewares/input-validator-middlewares";

import { jwtService } from "../aplication/jwt-aplication";
import { emailManager } from "../aplication/email-manager";
import { registrationServise } from "../domain/registration-service";

export const authUserRouter = Router({});

authUserRouter.post("/login", async (req: Request, res: Response) => {
  const { login, password, email } = req.body;
  if (login && password) {
    const user = await userService.findUser({ login, password });
    if (user) {
      const token = await jwtService.createJWT(user);
      res.send(token);
      return;
    }
  }

  res.sendStatus(401);
});
authUserRouter.post(
  "/registration",
  isUserValidRegistration,
  inputValidator,
  async (req: Request, res: Response) => {
    const { login, password, email } = req.body;
    const result = await registrationServise.registratUserByEmai(
      email,
      login,
      password
    );
    if (result) {
      res.sendStatus(204);
      return;
    }
    res.status(400).send("Somthing went wrong");
  }
);
authUserRouter.post(
  "/registration-confirmation",

  async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code) {
      return res.send({
        errorsMessages: [
          {
            message: "Invalid value",
            field: "code",
          },
        ],
      });
    }
    const result = await registrationServise.confirmEmail(code);
    if (result) {
      return res.send(result);
    }
    res.sendStatus(404);
  }
);
authUserRouter.get(
  "/registration-confirmation",
  // isUserValidRegistration,
  // inputValidator,
  async (req: Request, res: Response) => {
    const { code } = req.query;
    res.send({ code, message: "success" });
    console.log(code, "confirmCode");
  }
);
