import { UsersRepository } from '@/repositories/users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';

export function makeAuthenticateUseCase() {
  const usersRepository = new UsersRepository();

  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
