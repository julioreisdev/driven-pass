import { Request, Response } from "express";
import { ICredential } from "../interfaces/credentials.interface";
import { addCredentialService, deleteCredentialService, findCredentialsUserService, findCredentialUserByIdService } from "../services/credentialsServices";

export async function addCredential(req: Request, res: Response) {
    const body : Omit<ICredential, 'userId'>  = res.locals.body
    const userId: number = res.locals.userId
    try {
        const result = await addCredentialService({...body, userId})
        return res.send(result)
    } catch (error: any) {
        if (error.type === 'unauthorized') return res.status(401).send(error.message)
        if (error.type === 'conflict') return res.status(409).send(error.message)
        return res.status(500).send(error)
    }
}

export async function listAllCredentials(req: Request, res: Response) {
    const userId: number = res.locals.userId
    try {
        const result = await findCredentialsUserService(userId)
        return res.send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function listCredentialById(req: Request, res: Response) {
    const userId: number = res.locals.userId
    const id: number = Number(req.params.id)
    try {
        const result = await findCredentialUserByIdService(userId, id)
        return res.send(result)
    } catch (error: any) {
        if (error.type === 'not_found') return res.status(404).send(error.message) 
        return res.status(500).send(error)
    }
}

export async function deleteCredential (req: Request, res: Response) {
    const userId: number = res.locals.userId
    const id: number = Number(req.params.id)
    try {
        const result = await deleteCredentialService(userId, id)
        return res.send(result)
    } catch (error: any) {
        if (error.type === 'not_found') return res.status(404).send(error.message) 
        return res.status(500).send(error)
    }
}