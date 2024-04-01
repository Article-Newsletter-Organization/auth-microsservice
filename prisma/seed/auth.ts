import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  if ((await prisma.user.count()) == 0) {
    const admin = await prisma.user.upsert({
      where: { email: 'teste@example.com' },
      update: {},
      create: {
        email: 'teste@example.com',
        username: 'teste',
        name: 'Teste',
        password: await bcrypt.hash(
          'strongpassword',
          parseInt(process.env['SALT'] ?? '12'),
        ),
        role: 'ADMIN',
      },
    });
    console.log({ admin });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
