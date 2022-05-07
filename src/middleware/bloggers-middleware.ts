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
  if (!name) {
    const error: ErrorType = {
      message: "string",
      field: "name",
    };
    errorsArray.push(error);
  }
  if (!youtubeUrl) {
    const error: ErrorType = {
      field: "youtubeUrl",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (!youtubeUrl.match(regx)) {
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
