import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';

export interface IUsersRepository {
  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  create(data: Prisma.UserCreateInput): Promise<User>;
}

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
