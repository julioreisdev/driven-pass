import { Router } from "express";
import { addCredential } from "../controllers/credentialsControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import credentialSchema from "../schemas/credentialSchema";

const router = Router()

router.post('/credential', validateToken, validateSchema(credentialSchema), addCredential)

export default router