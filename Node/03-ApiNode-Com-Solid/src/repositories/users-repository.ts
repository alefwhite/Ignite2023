import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { IUsersRepository } from '@/repositories/contracts/users-repository';

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
