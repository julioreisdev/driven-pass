import { Router } from "express";
import { addWifi, deleteWifi, findAllWifis, findWifi } from "../controllers/wifisControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import wifiSchema from "../schemas/wifiSchema";


const router = Router()

router.post('/wifis', validateToken, validateSchema(wifiSchema), addWifi)
router.get('/wifis', validateToken, findAllWifis)
router.get('/wifis/:id', validateToken, findWifi)
router.delete('/wifis/:id', validateToken, deleteWifi)

export default router