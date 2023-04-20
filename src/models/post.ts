import mongoose from 'mongoose';

export interface PostDocument {
  postAbout: string;
  postText: string;
}

const postSchema = new mongoose.Schema(
  {
    postAbout: { type: String, required: true },
    postText: { type: String, required: true },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model<PostDocument>('Post', postSchema);
