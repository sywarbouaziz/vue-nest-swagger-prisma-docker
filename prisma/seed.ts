import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.upsert({
      update: {},
      create: {
          firstname: 'Siwar',
          lastname: 'bouaziz',
          age: 21
      },
      where: undefined
  });
  const post2 = await prisma.user.upsert({
    update: {},
    create: {
        firstname: 'Siwar',
        lastname: 'gfgfgf',
        age: 21
    },
    where: undefined
});
  

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });