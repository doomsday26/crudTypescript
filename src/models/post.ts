import mongoose, { Types } from 'mongoose';

export interface PostDocument {
  authorId: string,
  postAbout: string;
  postText: string;
}

const postSchema = new mongoose.Schema(
  {
    authorId: { type: Types.ObjectId, required: true, ref: 'author' },
    postAbout: { type: String, required: true },
    postText: { type: String, required: true },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model<PostDocument>('Post', postSchema);
