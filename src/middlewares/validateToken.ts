import { Request, Response, NextFunction } from "express";
import authRepository from "../repositories/authRepository";

export async function validateToken (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    const session = await authRepository.findSessionByToken(`${token}`)
    if (!session) {
        return res.sendStatus(401)
    }
    res.locals.userId = session.userId
    next()
}