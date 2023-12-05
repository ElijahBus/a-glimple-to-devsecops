import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function insertEvents() {
  await prisma.event.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'DevSecCon Connect',
      location: 'Mombasa',
    },
  });

  await prisma.event.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'DevSecCon Connect',
      location: 'Nairobi',
    },
  });
}
