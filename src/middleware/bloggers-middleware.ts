import { Response, Request, NextFunction } from "express";

type ErrorType = {
  field: string;
  error: string;
};
const regx =
  "^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$";
export const isBloggerValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, youtubeUrl } = req.body;
  const errorsArray = [];
  if (!name) {
    const error: ErrorType = {
      field: "name",
      error: " required",
    };
    errorsArray.push(error);
  }
  if (!youtubeUrl) {
    const error: ErrorType = {
      field: "youtubeUrl",
      error: " required",
    };
    errorsArray.push(error);
  }
  if (!youtubeUrl.match(regx)) {
    const error: ErrorType = {
      field: "youtubeUrl",
      error: `must match regx ${regx}`,
    };
    errorsArray.push(error);
  }
  if (errorsArray.length) {
    res.status(400).send({ errorMessage: errorsArray });
  } else {
    next();
  }
};

export const isId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  console.log(id, "ID");

  if (!id) {
    return res.send({ error: " ID is required" });
  }
  next();
};
