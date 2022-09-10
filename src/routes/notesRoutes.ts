import { Router } from "express";
import { addNote, deleteNote, listAllNotes, listNoteById } from "../controllers/notesControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import notesSchema from "../schemas/notesSchema";

const router = Router()

router.post('/notes', validateToken, validateSchema(notesSchema), addNote)
router.get('/notes', validateToken, listAllNotes)
router.get('/notes/:id', validateToken, listNoteById)
router.delete('/notes/:id', validateToken, deleteNote)

export default router