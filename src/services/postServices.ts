import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose';
import { PostDocument, PostModel } from '../models/post';

export async function createPost(input: PostDocument) {
  return await PostModel.create(input);
}

export async function findPostById(
  id: Pick<FilterQuery<PostDocument>, '_id'>,
) {
  console.log(id)
  return await PostModel.findById(id).populate('authorId');
}
export async function getAllPosts(limit: number, skip: number, search?: string) {
  const result = await PostModel.aggregate([
    {
      $lookup: {
        localField: 'authorId',
        foreignField: '_id',
        as: 'author',
        from: 'authors'
      }
    }, {
      $unwind: {
        path: '$author',
        preserveNullAndEmptyArrays: true
      }
    },
    { $skip: skip },
    { $limit: limit }
  ])
  return result;
}

export async function findAndUpdatePost(
  id: Pick<FilterQuery<PostDocument>, '_id'>,
  data: Partial<FilterQuery<PostDocument>>
) {
  return await PostModel.findOneAndUpdate(id, { $set: data }, { new: true });
}

export async function deletePost(id: Pick<FilterQuery<PostDocument>, '_id'>) {
  return await PostModel.findByIdAndDelete(id);
}
