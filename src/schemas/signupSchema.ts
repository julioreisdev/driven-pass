import joi from 'joi'

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export default signupSchema