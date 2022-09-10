import connection from "../database/config";
import { IAuth, IToken } from "../interfaces/auth.interface";

async function register(data: IAuth) {
    return await connection.users.create({data: {email: data.email, password: data.password}})
} 

async function findByEmail(data: Omit<IAuth, 'id' | 'password'>) {
    return await connection.users.findUnique({where: {email: data.email}})
} 

async function findSessionByUserId(id: number) {
    return await connection.sessions.findUnique({where: {userId: id}})
}

async function findSessionByToken(token: string) {
    return await connection.sessions.findUnique({where: {token: token}})
}

async function addSession(data: IToken) {
    return await connection.sessions.create({data: {userId: data.userId, token: data.token}})
}

async function updateSession (data: IToken) {
    return await connection.sessions.update({where: {userId: data.userId}, data: {token: data.token}})
}

const authRepository = {
    register,
    findByEmail,
    findSessionByUserId,
    findSessionByToken,
    addSession,
    updateSession
}

export default authRepository