import mongoose from "mongoose";
export interface AuthorDocument {
    name: string,
    email: string,
}

const authorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true }
    }
)

export const AuthorModel = mongoose.model<AuthorDocument>('author', authorSchema)