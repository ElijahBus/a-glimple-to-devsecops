import process from 'process';
import { insertEvents, prisma } from './events.seed';

export * from './events.seed';

async function main() {
  await insertEvents();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
