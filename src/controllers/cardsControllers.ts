import { Request, Response } from "express";
import { ICard } from "../interfaces/cards.interface";
import {
  addCardService,
  deleteCardService,
  findAllCardsService,
  findCardService,
} from "../services/cardsServices";

export async function addCard(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const data: Omit<ICard, "userId"> = req.body;
  try {
    const result = await addCardService({ ...data, userId });
    return res.send(result);
  } catch (error: any) {
    if (error.type === "conflict") return res.status(500).send(error.message);
    return res.status(500).send(error);
  }
}

export async function findAllCards(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  try {
    const result = await findAllCardsService(userId);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function findCard(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const userId: number = res.locals.userId;
  try {
    const result = await findCardService(userId, id);
    return res.send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

export async function deleteCard(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const userId: number = res.locals.userId;
  try {
    const result = await deleteCardService(userId, id);
    return res.send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}
