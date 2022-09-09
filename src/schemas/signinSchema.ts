import joi from 'joi'
import { IAuth } from '../interfaces/auth.interface'

const signinSchema = joi.object<IAuth>({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export default signinSchema