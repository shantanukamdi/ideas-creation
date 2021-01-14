import { Request, Response } from "express";

import { PG_UNIQUE_CONSTRAINT_VIOLATION, SALT_ROUNDS } from "../constants";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { generateHash } from "../utils/utils";

export const Register = async (req: Request, res: Response) => {
  /** get the username and password from the request*/
  const { email, password, name } = req.body;

  const userRepository = await getRepository(User);

  console.log("/register", req.body);

  const user = new User();
  user.email = email;
  user.password = generateHash(password);
  user.name = name;

  try {
    const savedUser = await userRepository.save(user);

    const cloneUser: any = { ...savedUser };
    delete cloneUser["password"];
    res.send(cloneUser);
  } catch (error) {
    if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {
      res.status(409).send({
        message: `Email already exists`,
      });
    } else {
      res.status(500).send({
        message: `Something went wrong!`,
      });
    }
  }
};
