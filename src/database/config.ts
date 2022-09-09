import pkg from '@prisma/client'

const { PrismaClient } = pkg;
const connection = new PrismaClient()

export default connection