import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '@/repositories/contracts/users-repository';

export class UsersRepository implements IUsersRepository {
  findById(id: string): Promise<User | null> {
    return Promise.resolve(null);
  }
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
