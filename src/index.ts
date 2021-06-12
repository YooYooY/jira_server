import "module-alias/register";
import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import router from "@/routes";

import createDatabaseConnection from "@/database/createConnection";

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    console.log("connect database...");
    await createDatabaseConnection();
    console.log("database connect success!");
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1", router);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Serving on http://localhost:${port}`);
  });
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
