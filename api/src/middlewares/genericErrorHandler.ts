import * as HttpStatus from "http-status-codes";

import { Request, Response, NextFunction } from "express";

import { Logger } from "../utils/logger/";

export default function genericErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const logger = new Logger(__filename);

  logger.error(`Error: ${JSON.stringify(err)}`);

  const errCode = err.status || err.code || 500;
  let errorMsg = "";

  if (err.error) {
    errorMsg = err.error
      ? err.error.message + " " + (err.error.detail || "")
      : err.message;
  }

  if (err.errors) {
    errorMsg = err.errors.map((e: any) => e.param + ": " + e.msg).toString();
  }

  res.status(errCode).json({
    success: false,
    code: errCode,
    message: errorMsg,
  });
}
