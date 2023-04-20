import { Request, Response } from 'express';
import {
  createPost,
  findAndUpdate,
  findPost,
  deletePost,
} from '../services/postServices';
import { redisClient } from '../utils/redisClient';

export async function getOnePost(req: Request, res: Response) {
  const data = await findPost({ __id: req.params.id });
  res.status(200).json({
    message: 'single post',
    data,
  });
}

export async function getAllPost(req: Request, res: Response) {
  const cachedPosts = await redisClient.get('Posts');
  if (cachedPosts) {
    res.status(200).json({
      message: 'all posts',
      data: JSON.parse(cachedPosts),
    });
    return;
  }
  const data = await findPost({});
  await redisClient.set('Posts', JSON.stringify(data));
  res.status(200).json({
    message: 'all posts',
    data,
  });
}

export async function deleteOnePost(req: Request, res: Response) {
  const data = await deletePost({ _id: req.params.id });
  await redisClient.del('Posts');

  res.status(200).json({
    message: 'deleted the post',
    data,
  });
}

export async function createOnePost(req: Request, res: Response) {
  const { postAbout, postText } = req.body;
  const post = await createPost({
    postAbout,
    postText,
  });
  await redisClient.del('Posts');
  res.status(200).json({ message: 'created single post', data: post });
}

export async function updateOnePost(req: Request, res: Response) {
  const data = await findAndUpdate(
    { _id: req.params.postId },
    { postAbout: req.body.postAbout, postText: req.body.postText }
  );
  await redisClient.del('Posts');
  res.json({
    message: 'updated single post',
    data,
  });
}
