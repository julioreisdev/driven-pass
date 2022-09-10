import { Notes } from "@prisma/client";

export type INotes = Omit<Notes, 'id'>