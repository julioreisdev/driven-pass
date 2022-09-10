import { INotes } from "../interfaces/notes.interface";
import notesRepository from "../repositories/notesRepository";

interface INotesResult {
  id: number;
  userId: number;
  title: string;
  content: string;
}

export async function addNoteService(data: INotes) {
  const note: INotesResult[] = await notesRepository.findNotesUserByTitle(
    data.userId,
    data.title
  );
  if (note.length !== 0) {
    throw { type: "conflict", message: "Already note with this title" };
  }
  await notesRepository.insert(data);
  return "Note created successify";
}

export async function findNotesUserService(userId: number) {
  const notes: INotesResult[] = await notesRepository.findAllNotesUser(userId);
  if (notes.length === 0) {
    return { notes, message: "Notes is empty" };
  }
  const notesView = notes.map((n) => {
    return { id: n.id, title: n.title, content: n.content };
  });
  return { notes: notesView };
}

export async function findNoteUserByIdService(userId: number, id: number) {
  const note: INotesResult[] = await notesRepository.findNotesUserById(
    userId,
    id
  );
  if (note.length === 0) {
    throw { type: "not_found", message: "Note not found" };
  }
  const notesView = note.map((n) => {
    return { id: n.id, title: n.title, content: n.content };
  });
  return { notes: notesView };
}

export async function deleteNoteService(userId: number, id: number) {
    const note: INotesResult[] = await notesRepository.findNotesUserById(
      userId,
      id
    );
    if (note.length === 0) {
      throw { type: "not_found", message: "Note not found" };
    }

    await notesRepository.deleteNote(userId, id)
    
    return 'Note deleted successify';
  }
  
