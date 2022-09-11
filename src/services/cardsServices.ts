import { ICard } from "../interfaces/cards.interface";
import cardsRepository from "../repositories/cardsRepository";
import { decrypt, encrypt } from "../utils/cryptr";

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

export async function findAllCardsService(userId: number) {
  const cards: ICardResult[] = await cardsRepository.findAllCardsUser(userId);
  if (cards.length === 0) {
    return { cards, message: "Cards is empty" };
  }
  const cardsView = cards.map((c) => {
    return {
      id: c.id,
      name: c.name,
      password: decrypt(c.password),
      cvc: decrypt(c.cvc),
      isValid: c.isVirtual,
      expirationDate: c.expirationDate,
      type: c.type,
      number: c.number,
    };
  });
  return { cards: cardsView };
}

export async function findCardService(userId: number, id: number) {
  const card: ICardResult[] = await cardsRepository.findCardUserById(
    userId,
    id
  );
  if (card.length === 0) {
    throw { type: "not_found", message: "Card not exist" };
  }
  const cardsView = card.map((c) => {
    return {
      id: c.id,
      name: c.name,
      password: decrypt(c.password),
      cvc: decrypt(c.cvc),
      isValid: c.isVirtual,
      expirationDate: c.expirationDate,
      type: c.type,
      number: c.number,
    };
  });
  return { cards: cardsView };
}

export async function deleteCardService(userId: number, id: number) {
  const card: ICardResult[] = await cardsRepository.findCardUserById(
    userId,
    id
  );
  if (card.length === 0) {
    throw { type: "not_found", message: "Card not exist" };
  }
  await cardsRepository.deleteCard(userId, id);
  return {card: card[0].name, message: 'Deleted'};
}
