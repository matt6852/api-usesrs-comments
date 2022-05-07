import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { runDb } from "./repositories/db";
import { productsRouter } from "./routes/products-router";
import bloggerRouter from "./routes/bloggers-router";
import postsRoute from "./routes/posts-route";

// create express app
const app = express();

const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

const port = process.env.PORT || 5001;

app.use("/products", productsRouter);
app.use("/bloggers", bloggerRouter);
app.use("/posts", postsRoute);

const startApp = async () => {
  const db = await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
  });
};

startApp();
