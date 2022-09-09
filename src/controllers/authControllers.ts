import { Request, Response } from "express";
import { IAuth } from "../interfaces/auth.interface";
import authServices from "../services/authServices";

export async function signin(req: Request, res: Response) {
    const data: IAuth = res.locals.body
    try {
        const result = await authServices.login(data)
        res.send(result)
    } catch (error: any) {
        if (error.type === 'unauthorized') return res.sendStatus(401)
        return res.status(500).send(error)
    }
}

export async function signup(req: Request, res: Response) {
    const data: IAuth = res.locals.body
    try {
        const result = await authServices.register(data)
        return res.status(201).send(result)
    } catch (error: any) {
        if (error.type === 'conflict') return res.sendStatus(409)
        return res.status(500).send(error)
    }
}