import { PrismaClient } from '@prisma/client/index.js';

export interface GraphQLContext {
  prisma: PrismaClient;
}