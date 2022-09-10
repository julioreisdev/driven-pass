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

const cardsRepository = {
  insert,
  findCardUserByName,
};

export default cardsRepository;
