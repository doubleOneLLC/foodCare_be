import express from "express";
import rateLimiter from "@/lib/rateLimiter";

const server = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(rateLimiter(60, 60));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use("/static/public", express.static("./public/uploads/"));

  return app;
};

export default server;
