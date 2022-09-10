import { ICredential } from "../interfaces/credentials.interface";
import credentialsRepository from "../repositories/credentialsRepository";
import { decrypt, encrypt } from "../utils/cryptr";

interface ICredentialResult {
    id: number,
    userId: number,
    url: string,
    username: string,
    password: string,
    title: string 
}

export async function addCredentialService(data: ICredential) {
    const urls = await credentialsRepository.findCredentialsUserByUrl(data.userId, data.url)
    if (urls.length === 2) {
        throw { type: 'unauthorized', message: 'Already reached max credentials with this address!' }
    }

    const urlTitleExist = await credentialsRepository.findCredentialUserByTitle(data.userId, data.title)
    if (urlTitleExist.length !== 0) {
        throw { type: 'conflict', message: 'Already exist one credential with this title' }
    }

    const password: string = encrypt(data.password)
    await credentialsRepository.createCredential({...data, password})

    return 'Credential created successify'
}

export async function findCredentialsUserService(userId: number) {
    const credentials: ICredentialResult[] = await credentialsRepository.findAllCredentialsUser(userId)
    if (credentials.length === 0) {
        return {credentials, message: 'Credentials list is empty!'}
    }
    const credentialsList = credentials.map((c: ICredentialResult) => {
        return {id: c.id,title: c.title, url: c.url, username: c.username, password: decrypt(`${c.password}`)}
    })
    return {credentials: credentialsList}
}

export async function findCredentialUserByIdService(userId: number, id: number) {
    const credential: ICredentialResult[] = await credentialsRepository.findCredentialsUserById(userId, id)
    if (credential.length === 0) {
        throw { type: 'not_found', message: 'Credential not found' }
    }
    const credentialsView = credential.map((c: ICredentialResult) => {
        return {id: c.id, title: c.title, url: c.url, username: c.username, password: decrypt(`${c.password}`)}
    })
    return credentialsView
}

export async function deleteCredentialService(userId: number, id: number) {
    const credential: ICredentialResult[] = await credentialsRepository.findCredentialsUserById(userId, id)
    if (credential.length === 0) {
        throw { type: 'not_found', message: 'Credential not found' }
    }
    await credentialsRepository.deleteCredential(userId, id)
    return {credential: credential[0].title, message: 'Deleted'}
}