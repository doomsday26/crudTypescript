import express, { Request, Response } from "express";
const Router = express.Router();
import { getAllAuthors, getOneAuthor, createOneAuthor, updateOneAuthor, deleteOneAuthor } from '../controllers/authorControllers'
import { authorValidatonRules, deleteOrFetchAuthor, updateAuthorRules, validateAuthor } from "../utils/authorValidator";
Router.get('/allAuthors', getAllAuthors)
Router.get('/singleAuthor/:authorId', [...deleteOrFetchAuthor], validateAuthor, getOneAuthor)
Router.post('/createAuthor', [...authorValidatonRules], validateAuthor, createOneAuthor)
Router.put('/updatAuthor/:authorId', [...updateAuthorRules], validateAuthor, updateOneAuthor)
Router.delete('/deleteAuthor/:authorId', [...deleteOrFetchAuthor], validateAuthor, deleteOneAuthor)

Router.get('/aboutAuthors', (req: Request, res: Response) => {
    res.json({ data: 'about authors' })
})

export { Router }