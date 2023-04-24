import { Request, Response } from "express";
import { createAuthor, deleteAuthor, findAndUpdateAuthor, findAuthor } from '../services/authorServices'


export async function createOneAuthor(req: Request, res: Response) {
    const { name, email } = req.body
    const data = await createAuthor({ name, email })
    res.status(200).json({
        message: 'created the author', data
    })
}


export async function getOneAuthor(req: Request, res: Response) {
    const author = await findAuthor({ _id: req.params.authorId })
    res.status(200).json({
        message: 'single user credentials',
        data: author
    })
}

export async function getAllAuthors(req: Request, res: Response) {
    const data = await findAuthor({})
    res.status(200).json({
        message: 'all authors',
        data
    })
}

export async function updateOneAuthor(req: Request, res: Response) {
    const data = await findAndUpdateAuthor(
        { _id: req.params.authorId },
        { name: req.body.name, email: req.body.email }
    )

    res.json({
        message: 'updated the user credentials',
        data
    })
}

export async function deleteOneAuthor(req: Request, res: Response) {
    const data = await deleteAuthor({ _id: req.params.authorId })
    res.status(200).json({
        message: "author removed from the database",
        data
    })
}
