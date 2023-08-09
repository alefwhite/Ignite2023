import { expect, it } from 'vitest';
import { UsersRepository } from '@/repositories/users-repository';
import { RegisterUseCase } from '@/use-cases/register';

// @ts-ignore
expect('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new UsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'Romero',
      email: 'romero@gmail.com',
      password: '123456',
    });

    console.log(user);
  });
});
