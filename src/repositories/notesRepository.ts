import connection from "../database/config";
import { INotes } from "../interfaces/notes.interface";

async function insert(data: INotes) {
    return await connection.notes.create({data: data})
}

async function findNotesUserByTitle (userId: number, title: string) {
    return await connection.notes.findMany({where: {userId: userId, title: title}})
}

async function findNotesUserById(userId: number, id: number) {
    return await connection.notes.findMany({where: {userId: userId, id: id}})
}

async function findAllNotesUser(userId: number) {
    return await connection.notes.findMany({where: {userId: userId}})
}

async function deleteNote(userId: number, id: number) {
    return await connection.notes.deleteMany({where: {userId: userId, id: id}})
}

const notesRepository = {
    insert,
    findNotesUserByTitle,
    findNotesUserById,
    findAllNotesUser,
    deleteNote
}

export default notesRepository