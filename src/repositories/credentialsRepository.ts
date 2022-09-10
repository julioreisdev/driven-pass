import connection from "../database/config";
import { ICredential } from "../interfaces/credentials.interface";

async function findCredentialsUserByUrl(userId: number, url: string) {
    return await connection.credentials.findMany({where: {url: url, userId: userId}})
}

async function findCredentialUserByTitle(userId: number, title: string) {
    return await connection.credentials.findMany({where: {userId: userId, title: title}})
}

async function findAllCredentialsUser(userId: number) {
    return await connection.credentials.findMany({where: {userId: userId}})
}

async function findCredentialsUserById(userId: number, id: number) {
    return await connection.credentials.findMany({where: {userId: userId, id: id}})
}

async function createCredential(data: ICredential) {
    return await connection.credentials.create({data: data})
}

async function deleteCredential(userId: number, id: number) {
    return await connection.credentials.deleteMany({where: {userId: userId, id: id}})
}

const credentialsRepository = {
    findCredentialsUserByUrl,
    findCredentialUserByTitle,
    findAllCredentialsUser,
    findCredentialsUserById,
    createCredential,
    deleteCredential
}

export default credentialsRepository