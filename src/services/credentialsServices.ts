import { ICredential } from "../interfaces/credentials.interface";
import credentialsRepository from "../repositories/credentialsRepository";
import { encrypt } from "../utils/cryptr";

export async function addCredentialService(data: ICredential) {
    const urls = await credentialsRepository.findCredentialsByUrl(data.url)
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