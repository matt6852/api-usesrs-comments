import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { runDb } from "./repositories/db";
import { bloggersRouter } from "./routes/bloggers-router";
import { postsRouter } from "./routes/content-router";

const app = express();

const port = process.env.PORT || 5001;
app.use(cors());
app.use(bodyParser.json());

app.use("/posts", postsRouter);
app.use("/bloggers", bloggersRouter);

app.get("/", (req, res) => {
  res.send("hello world!");
});
const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
  });
};

startApp();
