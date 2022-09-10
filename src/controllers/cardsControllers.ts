import { Request, Response } from "express";
import { ICard } from "../interfaces/cards.interface";
import { addCardService } from "../services/cardsServices";

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
