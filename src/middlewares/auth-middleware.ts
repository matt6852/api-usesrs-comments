import { userService } from "./../domain/users-service";
import { jwtService } from "./../aplication/jwt-aplication";
import { Request, Response, NextFunction } from "express";
import { send } from "process";
// import { authService } from "../domain/users-service";
export interface BaseAuthData {
  login: string;
  password: string;
}

export const authService = {
  decodeBaseAuth(token: string): BaseAuthData {
    const buff = Buffer.from(token, "base64");

    const decodedString = buff.toString("ascii");

    const loginAndPassword = decodedString.split(":");
    console.log(loginAndPassword[0], loginAndPassword[1]);
    return {
      login: loginAndPassword[0],
      password: loginAndPassword[1],
    };
  },
};

enum BaseAuthPayload {
  login = "admin",
  password = "qwerty",
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }

  if (req.headers.authorization.split(" ")[0] !== "Basic") {
    res.sendStatus(401);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodedBaseData = authService.decodeBaseAuth(token);

  if (
    decodedBaseData.login !== BaseAuthPayload.login &&
    decodedBaseData.password !== BaseAuthPayload.password
  ) {
    res.sendStatus(401);
    return;
  }

  next();
};

export const checkJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.sendStatus(401);
    }
    const token = req.headers.authorization.split(" ")[1];
    const { userId: id } = await jwtService.verifyJWT(token);
    if (id) {
      req.user = await userService.findUserById(id);
      return next();
    }
  } catch (error) {
    console.log(error);

    res.sendStatus(401);
  }

  // return res.sendStatus(401);
  // next();
};
