import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
export const postValidationRules =
  [
    // username must be an email
    body('authorId').isString(),
    body('postAbout').isString(),
    body('postText').isString(),
  ];

export const updatePostRules = [
  param('postId').isMongoId(),
  body('authorId').isString(),
  body('postAbout').isString(),
  body('postText').isString(),
];

export const deleteOrFetch = [param('postId').isMongoId()];


export async function validatePost(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }


  return res.status(422).json({
    errors: errors.array()
  });
};
