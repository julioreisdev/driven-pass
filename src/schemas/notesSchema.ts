import joi from "joi"
import { INotes } from "../interfaces/notes.interface"

const notesSchema = joi.object<Omit <INotes, 'userId'>>({
    title: joi.string().max(50).required(),
    content: joi.string().max(1000).required()
})

export default notesSchema