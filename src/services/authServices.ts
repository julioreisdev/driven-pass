import { IAuth } from "../interfaces/auth.interface";

export async function login(data: IAuth) {
    return {data}
}

export async function register(data: IAuth) {
    return {data}
}

const authServices = {
    login,
    register
}

export default authServices