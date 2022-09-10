import connection from "../database/config";
import { ICredential } from "../interfaces/credentials.interface";

async function findCredentialsByUrl(url: string) {
    return await connection.credentials.findMany({where: {url: url}})
}

async function findCredentialUserByTitle(userId: number, title: string) {
    return await connection.credentials.findMany({where: {userId: userId, title: title}})
}

async function createCredential(data: ICredential) {
    return await connection.credentials.create({data: data})
}

const credentialsRepository = {
    findCredentialsByUrl,
    findCredentialUserByTitle,
    createCredential
}

export default credentialsRepository