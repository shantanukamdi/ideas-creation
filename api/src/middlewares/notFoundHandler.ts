import * as HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export default function notFoundError(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(HttpStatus.StatusCodes.NOT_FOUND).json({
    error: {
      code: HttpStatus.StatusCodes.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.StatusCodes.NOT_FOUND),
    },
  });
}
