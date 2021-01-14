import { Request, Response } from "express";
import { User } from "../entities/User";
import { getRepository } from "typeorm";

export const Me = async (req: Request, res: Response) => {
  /** get the username and password from the request*/
  const payload = req.payload;

  const userRepository = await getRepository(User);

  /** search for the user in the db, it should be either present or absent in the db */
  const userFromDB = await userRepository.findOne({
    where: {
      id: payload.userId,
    },
    select: ["email", "id", "name"],
  });

  if (!userFromDB) {
    res.status(404).send({
      message: "User does not exist!",
    });
    return;
  } else {
    res.status(200).send(userFromDB);
    return;
  }
};
