import { Router } from "express";
import { signin, signup } from "../controllers/authControllers";
import validateSchema from "../middlewares/validateSchema";
import signinSchema from "../schemas/signinSchema";
import signupSchema from "../schemas/signupSchema";

const router = Router()

router.post('/signin', validateSchema(signinSchema), signin)
router.post('/signup', validateSchema(signupSchema), signup)

export default router