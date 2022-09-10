import { ICard } from "../interfaces/cards.interface";
import cardsRepository from "../repositories/cardsRepository";
import { encrypt } from "../utils/cryptr";

interface ICardResult {
  id: number;
  userId: number;
  number: string;
  name: string;
  cvc: string;
  expirationDate: String;
  password: string;
  isVirtual: boolean;
  type: string;
}

export async function addCardService(data: ICard) {
  const card: ICardResult[] = await cardsRepository.findCardUserByName(
    data.userId,
    data.name
  );
  if (card.length !== 0) {
    throw { type: "conflict", message: "Card already exist" };
  }

  await cardsRepository.insert({
    ...data,
    cvc: encrypt(data.cvc),
    password: encrypt(data.password),
  });

  return "Card created successify";
}
