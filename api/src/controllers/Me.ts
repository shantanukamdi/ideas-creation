import { Request, Response, NextFunction, Router } from "express";
import * as HttpStatus from "http-status-codes";

import { UserService } from "../services/user.service";

const router: Router = Router();

router.route("/").get(async (req: any, res: Response, next: NextFunction) => {
  /** get the username and password from the request*/
  const payload = req.payload;

  const userService = new UserService();

  const user = await userService.getById(payload.userId);

  if (!user) {
    const error = {
      sucess: false,
      message: "User does not exist!",
      code: HttpStatus.StatusCodes.BAD_REQUEST,
    };
    next(error);
  } else {
    res.status(HttpStatus.StatusCodes.OK).json({
      success: true,
      data: user,
    });
    return;
  }
});

export default router;
