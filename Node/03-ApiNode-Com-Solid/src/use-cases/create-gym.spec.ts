import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from '@/use-cases/create-gyms';

// UNIT TEST
// @ts-ignore

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Js Gym',
      description: null,
      phone: null,
      latitude: -23.4708365,
      longitude: -46.6522294,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
