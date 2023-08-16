import { UsersRepository } from '@/repositories/users-repository';
import { RegisterUseCase } from '@/use-cases/register';

export function makeRegisterUseCase() {
  const usersRepository = new UsersRepository();

  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
