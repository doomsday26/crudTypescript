import { QueryOptions, FilterQuery, UpdateQuery } from "mongoose";
import { AuthorDocument, AuthorModel } from "../models/author";


export async function createAuthor(input: AuthorDocument) {
    return await AuthorModel.create(input)
}

export async function findAuthor(
    query: FilterQuery<AuthorDocument>,
    options: QueryOptions = { lean: true }
) {
    return await AuthorModel.find(query, {}, options)
}

export async function findAndUpdateAuthor(
    query: FilterQuery<AuthorDocument>,
    update: UpdateQuery<AuthorDocument>,
    options: QueryOptions = {}
) {
    return await AuthorModel.findOneAndUpdate(query, update, options);
}

export async function deleteAuthor(query: FilterQuery<AuthorDocument>) {
    return await AuthorModel.deleteOne(query)
}