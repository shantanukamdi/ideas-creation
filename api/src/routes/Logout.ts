import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
  // const jwtToken = req.app.locals.JWT_SECRET;
  // const redisClient = req.app.locals.redisClient;

  // const authHeader = req.headers.authorization;

  // if (!authHeader) {
  //   throw new Error("Not authenticated");
  // }
  // const token = authHeader.split(" ")[1];
  // const payload: any = jwt.verify(token, req.app.locals.JWT_SECRET);

  // redisClient.get(payload.email, (err: any, data: any) => {
  //   if (err) {
  //     res.send({
  //       message: "Unable to logout. Please try again later.",
  //     });
  //     return;
  //   }
  //   redisClient.del(payload.email);
  //   res.send({
  //     message: "Successfully logged out.",
  //   });
  // });
};
