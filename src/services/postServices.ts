import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose';
import { PostDocument, PostModel } from '../models/post';

export async function createPost(input: PostDocument) {
  return await PostModel.create(input);
}

export async function findPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  return await PostModel.find(query, {}, options);
}

export async function findAndUpdate(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions = {}
) {
  return await PostModel.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<PostDocument>) {
  return await PostModel.deleteOne(query);
}
