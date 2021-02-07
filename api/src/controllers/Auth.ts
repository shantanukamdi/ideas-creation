import { Request, Response, Router, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import * as HttpStatus from "http-status-codes";
import { User } from "../entities/User";
import config from "src/config/config";
import { UserService } from "../services/user.service";

const router: Router = Router();

const { auth } = config;

router
  .route("/")

  .post(
    [
      body("email").isEmail().isLength({ min: 1 }),
      body("password").isLength({ min: 1 }),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const validationErros = validationResult(req);

      if (validationErros.isEmpty()) {
        const { email, password } = req.body;
        const jwtToken = auth.secretKey;

        const userService = new UserService();

        const user = await userService.getByEmail(email);

        if (!user) {
          const error = {
            error: `User doesn't exist!`,
            code: HttpStatus.StatusCodes.NOT_FOUND,
          };
          next(error);
        } else {
          const passwordCompareResult = bcrypt.compareSync(
            password,
            user.password
          );

          if (passwordCompareResult) {
            const token = jwt.sign(
              {
                userId: user.id,
              },
              jwtToken,
              {
                expiresIn: 3600,
              }
            );
            res.status(HttpStatus.StatusCodes.OK).json({
              message: "Successfully logged in.",
              token,
            });
          } else {
            const error = {
              code: HttpStatus.StatusCodes.UNAUTHORIZED,
              error: "Either username or password is wrong. Please try again.",
            };
            next(error);
          }
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

// export const Auth = async (req: Request, res: Response) => {
//   const jwtToken = req.app.locals.JWT_SECRET;

//   /** get the username and password from the request*/
//   const { username, password } = req.body;

//   const userRepository = await getRepository(User);

//   /** search for the user in the db, it should be either present or absent in the db */
//   const userFromDB = await userRepository.findOne({
//     where: {
//       email: username,
//     },
//   });

//   if (!userFromDB) {
//     res.status(404).send({
//       message: "User does not exist!",
//     });
//     return;
//   }

//   const passwordCompareResult = bcrypt.compareSync(
//     password,
//     userFromDB.password
//   );

//   if (passwordCompareResult) {
//     const token = jwt.sign(
//       {
//         userId: userFromDB.id,
//       },
//       jwtToken,
//       {
//         expiresIn: 3600,
//       }
//     );
//     res.send({
//       message: "Successfully logged in.",
//       token,
//     });

//     return;
//   } else {
//     res.status(401).send({
//       message: "Either username or password is wrong. Please try again.",
//     });
//     return;
//   }
// };
