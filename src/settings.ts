export const settings = {
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/?maxPoolSize=20&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "MY_SECRET",
};
