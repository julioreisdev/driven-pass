import joi from "joi";
import { ICredential } from "../interfaces/credentials.interface";

const credentialSchema = joi.object<Omit<ICredential, 'userId'>>({
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  title: joi.string().required(),
});

export default credentialSchema