import { Router } from "express";
import { addCredential, deleteCredential, listAllCredentials, listCredentialById } from "../controllers/credentialsControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import credentialSchema from "../schemas/credentialSchema";

const router = Router()

router.post('/credential', validateToken, validateSchema(credentialSchema), addCredential)
router.get('/credentials', validateToken, listAllCredentials)
router.get('/credentials/:id', validateToken, listCredentialById)
router.delete('/credentials/:id', validateToken, deleteCredential)

export default router