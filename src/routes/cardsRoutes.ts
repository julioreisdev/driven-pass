import { Router } from "express";
import { addCard, deleteCard, findAllCards, findCard } from "../controllers/cardsControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import cardSchema from "../schemas/cardSchema";


const router = Router()

router.post('/cards', validateToken, validateSchema(cardSchema), addCard)
router.get('/cards', validateToken, findAllCards)
router.get('/cards/:id', validateToken, findCard)
router.delete('/cards/:id', validateToken, deleteCard)

export default router