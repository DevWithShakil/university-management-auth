import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwt.helpers';

const auth =
  (...requiredRules: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      //verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      // role diye guard

      if (requiredRules.length && !requiredRules.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
