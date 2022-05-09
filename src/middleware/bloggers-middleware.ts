import { Response, Request, NextFunction } from "express";

type ErrorType = {
  message: string;
  field: string;
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
  if (!name || !name.trim() || name.trim().length > 15) {
    const error: ErrorType = {
      message: "string",
      field: "name",
    };
    errorsArray.push(error);
  }
  if (!youtubeUrl || !youtubeUrl.trim() || youtubeUrl.trim().length > 100) {
    const error: ErrorType = {
      field: "youtubeUrl",
      message: "string",
    };
    errorsArray.push(error);
  }

  if (youtubeUrl && !youtubeUrl.match(regx)) {
    const error: ErrorType = {
      field: "youtubeUrl",
      message: `string`,
    };
    errorsArray.push(error);
  }
  // heroku login

  // git push heroku master
  // git commit -am "make it better"
  if (errorsArray.length) {
    res.status(400).send({ errorsMessages: errorsArray, resultCode: 1 });
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
