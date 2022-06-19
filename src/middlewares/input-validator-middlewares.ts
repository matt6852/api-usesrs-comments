import { NextFunction, Request, Response } from "express";
import { body, check, validationResult } from "express-validator";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/;

export const inputValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array({ onlyFirstError: true }).map((e) => {
      return {
        message: e.msg,
        field: e.param,
      };
    });
    res.status(400).json({ errorsMessages: err, resultCode: 1 });
  } else {
    next();
  }
};

export const isValidId = [check("id")];

export const isValidBlog = [
  body("name").isString().isLength({ max: 15 }).trim().not().isEmpty().bail(),
  body("youtubeUrl").matches(reg).isLength({ max: 100 }).bail(),
];
export const isUserValid = [
  body("login")
    .isString()
    .isLength({ max: 10, min: 3 })
    .trim()
    .not()
    .isEmpty()
    .bail(),
  body("password")
    .isString()
    .isLength({ max: 20, min: 6 })
    .trim()
    .not()
    .isEmpty()
    .bail(),
];

export const isValidPost = [
  body("title").isString().isLength({ max: 30 }).trim().not().isEmpty().bail(),
  body("shortDescription")
    .isString()
    .isLength({ max: 100 })
    .trim()
    .not()
    .isEmpty()
    .bail(),
  body("content")
    .isString()
    .isLength({ max: 1000 })
    .trim()
    .not()
    .isEmpty()
    .bail(),
  body("bloggerId").isInt({ gt: 0 }).not().isEmpty().bail(),
];
export const isValidPostByUri = [
  body("title").isString().isLength({ max: 30 }).trim().not().isEmpty().bail(),
  body("shortDescription")
    .isString()
    .isLength({ max: 100 })
    .trim()
    .not()
    .isEmpty()
    .bail(),
  body("content")
    .isString()
    .isLength({ max: 1000 })
    .trim()
    .not()
    .isEmpty()
    .bail(),
];
