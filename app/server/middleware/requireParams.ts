import { Request, Response, NextFunction } from 'express';

import { STATUS_CODE } from '../../shared/constants/statusCodes';

/**
 * Sends a 400 Bad Request if required parameters are not passed to endpoint.
 *
 * @param paramList
 * @returns void | Response<any, Record<string, any>>
 */
export const requireParameters = (paramList: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body, query } = req;
    const missing = {};

    paramList.forEach(param => {
      if (!body.hasOwnProperty(param) && !query.hasOwnProperty(param)) {
        missing[param] = `${param} is required`;
      }
    });

    if (Object.keys(missing).length !== 0) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        message: 'missing params',
        errors: missing,
      });
    }

    return next();
  };
};
