import "reflect-metadata";

import { Hono } from "hono";

import universitasRoute from "@routes/universitas.routes";
import { loggerMiddleware } from "@middlewares/global/logger";
import { onErrorHandler } from "@middlewares/global/error-handler";
const app = new Hono();

app.onError(onErrorHandler);
app.use("*", loggerMiddleware());
app.get("/", (c) => {
  return c.text("Hello Hono ! Server is running 🚀");
});

app.route("/universitas", universitasRoute);
export default app;
