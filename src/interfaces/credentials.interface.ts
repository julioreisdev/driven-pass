import { Credentials } from "@prisma/client";

export type ICredential = Omit<Credentials, 'id'>