import { Request, Response } from "express";
import { INotes } from "../interfaces/notes.interface";
import {
  addNoteService,
  deleteNoteService,
  findNotesUserService,
  findNoteUserByIdService,
} from "../services/notesServices";

export async function addNote(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const data: INotes = req.body;
  try {
    const result = await addNoteService({ ...data, userId });
    return res.send(result);
  } catch (error: any) {
    if (error.type === "conflict") return res.status(409).send(error.message);
    return res.status(500).send(error);
  }
}

export async function listAllNotes(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  try {
    const result = await findNotesUserService(userId);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function listNoteById(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const id: number = Number(req.params.id);
  try {
    const result = await findNoteUserByIdService(userId, id);
    return res.send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

export async function deleteNote(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const id: number = Number(req.params.id);
  try {
    const result = await deleteNoteService(userId, id);
    return res.send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}
