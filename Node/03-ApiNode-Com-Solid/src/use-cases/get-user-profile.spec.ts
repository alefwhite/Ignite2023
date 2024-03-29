import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

// UNIT TEST
// @ts-ignore
let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Romero Britto',
      email: 'romero_britto@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('Romero Britto');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
