import { Request, Response, NextFunction, Router } from "express";
import { body, validationResult } from "express-validator";
import * as HttpStatus from "http-status-codes";

import { User } from "../entities/User";
import { generateHash } from "../utils/utils";
import { UserService } from "../services/user.service";

const router: Router = Router();

router
  .route("/")

  .post(
    [
      body("email").isEmail().isLength({ min: 1 }),
      body("password").isLength({ min: 1 }),
      body("name").isLength({ min: 1 }),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const validationErros = validationResult(req);

      if (validationErros.isEmpty()) {
        const userService = new UserService();
        await userService.instantiate(req.body);

        try {
          const { email, password, name } = req.body;
          const user = new User();
          user.email = email;
          user.password = generateHash(password);
          user.name = name;

          const response = await userService.insert(user);
          res.status(HttpStatus.StatusCodes.OK).json({
            success: true,
            data: response,
          });
        } catch (err) {
          const error = {
            code: HttpStatus.StatusCodes.BAD_REQUEST,
            error: err,
          };
          next(error);
        }
      } else {
        const error = {
          code: HttpStatus.StatusCodes.BAD_REQUEST,
          errors: validationErros.array(),
        };
        next(error);
      }
    }
  );

export default router;
