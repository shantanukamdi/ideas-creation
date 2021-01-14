import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

export const Auth = async (req: Request, res: Response) => {
  const jwtToken = req.app.locals.JWT_SECRET;

  /** get the username and password from the request*/
  const { username, password } = req.body;

  const userRepository = await getRepository(User);

  /** search for the user in the db, it should be either present or absent in the db */
  const userFromDB = await userRepository.findOne({
    where: {
      email: username,
    },
  });

  if (!userFromDB) {
    res.status(404).send({
      message: "User does not exist!",
    });
    return;
  }

  const passwordCompareResult = bcrypt.compareSync(
    password,
    userFromDB.password
  );

  if (passwordCompareResult) {
    const token = jwt.sign(
      {
        userId: userFromDB.id,
      },
      jwtToken,
      {
        expiresIn: 3600,
      }
    );
    res.send({
      message: "Successfully logged in.",
      token,
    });

    return;
  } else {
    res.status(401).send({
      message: "Either username or password is wrong. Please try again.",
    });
    return;
  }
};
