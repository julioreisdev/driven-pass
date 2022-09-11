import { Wifis } from "@prisma/client";

export type IWifi = Omit<Wifis, 'id'>