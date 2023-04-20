import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).send(err?.message || 'something went wrong');
};
