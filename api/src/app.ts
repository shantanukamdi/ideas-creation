import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import config from "./config/config";
import nodeErrorHandler from "./middlewares/nodeErrorHandler";
import routes from "./routes";
import { Logger } from "./utils/logger";
import genericErrorHandler from "./middlewares/genericErrorHandler";
import notFoundError from "./middlewares/notFoundHandler";

export class Application {
  app: express.Application;
  config = config;
  logger: any;

  constructor() {
    this.logger = new Logger(__filename);

    this.app = express();

    this.app.locals.name = config.name;
    this.app.locals.version = config.version;

    this.app.use(cors());
    this.app.use(express.json());

    this.app.use("/", routes);
    this.app.use(genericErrorHandler);
    this.app.use(notFoundError);
  }

  setupDbAndServer = async () => {
    const conn = await createConnection();
    this.logger.info(
      `Connected to database. Connection: ${conn.name} / ${conn.options.database}`
    );

    await this.startServer();
  };

  startServer(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.app
        .listen(+this.config.port, this.config.host, () => {
          this.logger.info(
            `Server Started at http://${this.config.host}:${this.config.port}`
          );
          resolve(true);
        })
        .on("error", nodeErrorHandler);
    });
  }
}
