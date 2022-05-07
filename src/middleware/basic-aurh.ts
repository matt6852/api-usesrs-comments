import { send } from "process";
export const basicAuth = (req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  if (authorization) {
    const [login, password] = Buffer.from(authorization.split(" ")[1], "base64")
      .toString()
      .split(":");
    console.log("basic auth", authorization, login, password);
    if (login === "admin" && password === "qwerty") {
      next();
    }
  }
  res.send(401);
};
