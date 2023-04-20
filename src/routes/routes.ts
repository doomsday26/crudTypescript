import express, { Request, Response } from 'express';
import {
  deleteOrFetch,
  postValidationRules,
  updatePostRules,
  validate,
} from '../utils/utilityValidator';
const Router = express.Router();
import {
  getOnePost,
  deleteOnePost,
  updateOnePost,
  createOnePost,
  getAllPost,
} from '../controllers/postController';
Router.get('/allPosts', getAllPost);
Router.get('/onePost/:postId', deleteOrFetch(), validate, getOnePost);
Router.put('/update/:postId', updatePostRules(), validate, updateOnePost);
Router.post('/create', postValidationRules(), validate, createOnePost);
Router.delete('/deletePost/:postId', deleteOrFetch(), validate, deleteOnePost);

Router.get('/about', (req: Request, res: Response) => {
  res.json({ data: 'about page' });
});

export { Router };
