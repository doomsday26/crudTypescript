import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from 'express-validator';

export const authorValidatonRules = [
    body('name').isString(),
    body('email').isString()
]

export const updateAuthorRules = [
    param('authorId').isMongoId(),
    body('name').isString(),
    body('email').isString()
]

export const deleteOrFetchAuthor = [param('authorId').isMongoId()];

export const validateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(422).json({
        errors: errors.array()
    })
}