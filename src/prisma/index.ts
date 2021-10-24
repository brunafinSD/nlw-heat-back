// arquivo que faz a conexão com o banco
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default prismaClient;