import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
export const postValidationRules = () => {
  return [
    // username must be an email
    body('postAbout').isString(),
    body('postText').isString(),
  ];
};

export const updatePostRules = () => {
  return [
    param('postId').isMongoId(),
    body('postAbout').isString(),
    body('postText').isString(),
  ];
};

export const deleteOrFetch = () => {
  return [param('postId').isMongoId()];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Record<string, unknown>[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.type]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
