import { Request, Response } from 'express';
import {
  createPost,
  findAndUpdatePost,
  findPostById,
  deletePost,
  getAllPosts,
} from '../services/postServices';
import { redisClient } from '../utils/redisClient';
import { Types } from 'mongoose';

export async function getOnePost(req: Request, res: Response) {
  console.log(req.params.postId)
  const data = await findPostById(new Types.ObjectId(req.params.postId));
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
  const limit = 5
  const skip = 0
  const data = await getAllPosts(limit, skip);
  await redisClient.set('Posts', JSON.stringify(data));
  res.status(200).json({
    message: 'all posts',
    data,
  });
}

export async function deleteOnePost(req: Request, res: Response) {
  const data = await deletePost(new Types.ObjectId(req.params.postId));
  await redisClient.del('Posts');

  res.status(200).json({
    message: 'deleted the post',
    data
  });
}

export async function createOnePost(req: Request, res: Response) {
  const { authorId, postAbout, postText } = req.body;
  const post = await createPost({
    authorId,
    postAbout,
    postText,
  });
  await redisClient.del('Posts');
  res.status(200).json({ message: 'created single post', data: post });
}

export async function updateOnePost(req: Request, res: Response) {
  const data = await findAndUpdatePost(
    new Types.ObjectId(req.params.postId),
    { postAbout: req.body.postAbout, postText: req.body.postText }
  );
  await redisClient.del('Posts');
  res.json({
    message: 'updated single post',
    data,
  });
}
