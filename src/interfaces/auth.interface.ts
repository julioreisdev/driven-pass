import { Sessions, Users } from "@prisma/client";

export type IAuth = Omit<Users, 'id'>

export type IToken = Omit<Sessions, 'id'>