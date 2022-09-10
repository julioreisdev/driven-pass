import { IAuth, IToken } from "../interfaces/auth.interface";
import authRepository from "../repositories/authRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Users } from "@prisma/client";
import dotenv from 'dotenv'

dotenv.config()

export async function login(data: IAuth) {
    const existRegister: Users | null = await authRepository.findByEmail(data)
    if (!existRegister || !bcrypt.compareSync(data.password, existRegister.password)) {
        throw {type: 'unauthorized', message: 'Incorrect credentials!'}
    }
    const sessionExist =  await authRepository.findSessionByUserId(existRegister.id)
    const token = jwt.sign({token: data.password}, `${process.env.SECRET}`)
    const dataSession: IToken = {token: token, userId: existRegister.id}

    if (!sessionExist) {
        await authRepository.addSession(dataSession)
    }
    await authRepository.updateSession(dataSession)
    return {token}
}

export async function register(data: IAuth) {
    const existRegister: IAuth | null = await authRepository.findByEmail(data)
    if (existRegister) {
        throw {type: 'conflict', message: 'E-mail already exist'}
    }

    await authRepository.register({...data, password: bcrypt.hashSync(data.password, 10)})
    return 'Account created successify'
}

const authServices = {
    login,
    register
}

export default authServices