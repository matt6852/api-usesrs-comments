export const basicAuth = (req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (authorization.startsWith("Basic")) {
    const [login, password] = Buffer.from(authorization.split(" ")[1], "base64")
      .toString()
      .split(":");
    // console.log("basic auth", authorization, login, password);
    if (login === "admin" && password === "qwerty") {
      return next();
    }
  }
  return res.sendStatus(401);
};
