import { Router } from "express";
import { addCard } from "../controllers/cardsControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import cardSchema from "../schemas/cardSchema";


const router = Router()

router.post('/cards', validateToken, validateSchema(cardSchema), addCard)
router.get('/notes', validateToken)
router.get('/cards/:id', validateToken)
router.delete('/notes/:id', validateToken)

export default router