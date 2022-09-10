import Cryptr from 'cryptr';
import dotenv from 'dotenv'

dotenv.config()

export function encrypt(value: string): string {
    const cryptr = new Cryptr(`${process.env.SECRET}`)
    return cryptr.encrypt(value)
}

export function decrypt(value: string): string {
    const cryptr = new Cryptr(`${process.env.SECRET}`)
    return cryptr.decrypt(value)
}