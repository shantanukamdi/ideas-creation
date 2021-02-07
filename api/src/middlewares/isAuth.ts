import { RequestHandler, Request, Response, NextFunction } from "express";
import config from "../config/config";
import { verifyToken } from "../utils/utils";

const { auth } = config;

export const isAuth: RequestHandler<{}, any, any, {}> = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Not authenticated");
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const payload: any = verifyToken(token, auth.secretKey);
    (req as any).payload = payload;
    next();
    return;
  } catch (err) {
    console.error(err);
  }
};
