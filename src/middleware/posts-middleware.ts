import { Response, Request, NextFunction } from "express";

type ErrorType = {
  field: string;
  message: string;
};

export const isCreatPostValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, shortDescription, content, bloggerId } = req.body;
  const errorsArray = [];
  if (!title) {
    const error: ErrorType = {
      field: "title",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (!shortDescription) {
    const error: ErrorType = {
      field: "shortDescription",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (!content) {
    const error: ErrorType = {
      field: "content",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (!bloggerId) {
    const error: ErrorType = {
      field: "bloggerId",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (errorsArray.length) {
    res.status(400).send({ errorsMessages: errorsArray, resultCode: 1 });
  } else {
    next();
  }
};

export const isUpdatedPostValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, shortDescription, content } = req.body;
  const errorsArray = [];

  if (!title) {
    const error: ErrorType = {
      field: "title",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (!shortDescription) {
    const error: ErrorType = {
      field: "shortDescription",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (!content) {
    const error: ErrorType = {
      field: "content",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (errorsArray.length) {
    res.status(400).send({ errorMessage: errorsArray });
  } else {
    next();
  }
};
