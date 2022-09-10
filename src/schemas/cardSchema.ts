import joi from "joi";
import { ICard } from "../interfaces/cards.interface";

const cardSchema = joi.object<Omit<ICard, "userId">>({
  number: joi.string().required(),
  name: joi.string().required(),
  cvc: joi.string().min(3).max(3).required(),
  expirationDate: joi
    .string()
    .pattern(/(\d{2})[-.\/](\d{2})[-.\/](\d{4})/)
    .required(),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credito", "debito", "credito/debito").required(),
});

export default cardSchema;
