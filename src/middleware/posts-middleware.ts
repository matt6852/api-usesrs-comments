import { Response, Request, NextFunction } from "express";
import { postsService } from "../domain/posts-service";

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

  if (!title || !title.trim() || title.trim().length > 30) {
    const error: ErrorType = {
      field: "title",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (
    !shortDescription ||
    !shortDescription.trim() ||
    shortDescription.trim().length > 100
  ) {
    const error: ErrorType = {
      field: "shortDescription",
      message: "string",
    };
    errorsArray.push(error);
  }
  if (!content || !content.trim() || content.trim().length > 1000) {
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
    return res.status(400).send({ errorsMessages: errorsArray, resultCode: 1 });
  } else {
    next();
  }
};

export const isUpdatedPostValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, shortDescription, content, id } = req.body;
  const errorsArray = [];

  if (!title || !title.trim() || title.trim().length > 30) {
    const error: ErrorType = {
      message: "string",
      field: "title",
    };
    errorsArray.push(error);
  }
  if (
    !shortDescription ||
    !shortDescription.trim() ||
    shortDescription.trim().length > 100
  ) {
    const error: ErrorType = {
      message: "string",
      field: "shortDescription",
    };
    errorsArray.push(error);
  }
  if (!content || !content.trim() || content.trim().length > 1000) {
    const error: ErrorType = {
      message: "string",
      field: "content",
    };
    errorsArray.push(error);
  }

  if (errorsArray.length) {
    res.status(400).send({ errorsMessages: errorsArray, resultCode: 1 });
  } else {
    next();
  }
};

export const isIdValidPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const singlePost = await postsService.singlePost(+id);
  console.log(singlePost, "singlePost");

  if (!singlePost?.bloggerName) {
    return res.sendStatus(404);
  }
  next();
};
