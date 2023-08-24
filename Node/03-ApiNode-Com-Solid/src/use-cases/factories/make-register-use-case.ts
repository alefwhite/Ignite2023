import { RegisterUseCase } from '@/use-cases/register';
import { UsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeRegisterUseCase() {
  const usersRepository = new UsersRepository();

  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
