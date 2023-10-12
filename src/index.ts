import express from "express";

import rateLimiter from "./lib/rateLimiter";

import { router as teamRouter } from "./routers/team.route";
import { router as foodRouter } from "./routers/food.route";

const port = process.env.PORT || 8080;
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

app.use("/team", teamRouter);
app.use("/food", foodRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
