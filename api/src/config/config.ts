import * as dotenv from "dotenv";

import errors from "../assets/i18n/en/errors";
import messages from "../assets/i18n/en/messages";

dotenv.config();

export default {
  errors,
  messages,
  name: "Ideas Capturing App",
  version: "1.0.0",
  host: process.env.APP_HOST || "localhost",
  port: process.env.APP_PORT || 3002,
  auth: {
    secretKey: process.env.SECRET_KEY || "randomstring",
  },
  logging: {
    dir: process.env.LOGGING_DIR || "logs",
    level: process.env.LOGGING_LEVEL || "debug",
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  isProduction: process.env.NODE_ENV === "production",
  environment: process.env.NODE_ENV || "development",
};
