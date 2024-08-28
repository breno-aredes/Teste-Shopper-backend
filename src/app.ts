import express, { Express } from "express";
import cors from "cors";
import { handlingError } from "middleware/error-handling";
import { measureRouter } from "routes/measure.routes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/measure", measureRouter)
  .use(handlingError);

export function init(): Promise<Express> {
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  return Promise.resolve();
}

export default app;
