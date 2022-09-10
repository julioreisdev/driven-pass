import { Request, Response } from "express";
import { ICredential } from "../interfaces/credentials.interface";
import { addCredentialService } from "../services/credentialsServices";

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