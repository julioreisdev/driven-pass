import joi from 'joi'
import { IAuth } from '../interfaces/auth.interface'

const signupSchema = joi.object<IAuth>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export default signupSchema