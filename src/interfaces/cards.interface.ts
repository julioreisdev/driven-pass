import { Cards } from "@prisma/client";

export type ICard = Omit<Cards, 'id'>