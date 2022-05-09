export const bearerAuth = (req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  console.log(authorization, "authorization");

  if (authorization) {
    const [login, password] = Buffer.from(authorization.split(" ")[1], "base64")
      .toString()
      .split(":");
    console.log("Bearer", authorization, login, password);
    if (login === "admin" && password === "qwerty") {
      return next();
    }
  }
  return res.sendStatus(401);
};
