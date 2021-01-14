import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export const checkCache: RequestHandler<{}, any, any, {}> = (
  req,
  _res,
  next
) => {
  const redisClient = req.app.locals.redisClient;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Not authenticated");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload: any = jwt.verify(token, req.app.locals.JWT_SECRET);

    redisClient.get(payload.email, (err: any, data: any) => {
      if (err) {
        console.error(err);
        _res.status(500).send(err);
      }

      if (data != null) {
        console.log(`data from cache is ${data}`);
        _res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  } catch (err) {
    _res.status(500).send(err);
  }
};
