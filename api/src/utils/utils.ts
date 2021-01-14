import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS } from "../constants";

export const generateHash = (password: string) => {
  /** hash the password */

  const salt = bcrypt.genSaltSync(SALT_ROUNDS);

  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export const getAuthToken = (req: Request) => {
  if (req?.headers?.authorization) {
    return req?.headers?.authorization?.split(" ")[1];
  }
};

export const verifyToken = (token: string, jwtSecret: string) => {
  return jwt.verify(token, jwtSecret);
};
