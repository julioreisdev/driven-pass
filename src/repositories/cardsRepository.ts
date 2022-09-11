import connection from "../database/config";
import { ICard } from "../interfaces/cards.interface";

async function insert(data: ICard) {
  return await connection.cards.create({ data: data });
}

async function findCardUserByName(userId: number, name: string) {
  return await connection.cards.findMany({
    where: { userId: userId, name: name },
  });
}

async function findAllCardsUser(userId: number) {
  return await connection.cards.findMany({ where: { userId: userId } });
}

async function findCardUserById(userId: number, id: number) {
  return await connection.cards.findMany({ where: { userId: userId, id: id } });
}

async function deleteCard(userId: number, id: number) {
  return await connection.cards.deleteMany({ where: { userId: userId, id: id } });
}

const cardsRepository = {
  insert,
  findCardUserByName,
  findAllCardsUser,
  findCardUserById,
  deleteCard,
};

export default cardsRepository;
