import { Request, Response } from "express";
import { IAuth } from "../interfaces/auth.interface";
import authServices from "../services/authServices";

export async function signin(req: Request, res: Response) {
    const data: IAuth = res.locals.body
    try {
        const response = await authServices.login(data)
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function signup(req: Request, res: Response) {
    const data: IAuth = res.locals.body
    try {
        const response = await authServices.register(data)
        res.status(201).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}