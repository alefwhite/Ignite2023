import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from '@/use-cases/search-gyms';

// UNIT TEST
// @ts-ignore

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();

    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Js Gym',
      description: null,
      phone: null,
      latitude: -23.4708365,
      longitude: -46.6522294,
    });

    await gymsRepository.create({
      title: 'Ts Gym',
      description: null,
      phone: null,
      latitude: -23.4708365,
      longitude: -46.6522294,
    });

    const { gyms } = await sut.execute({ query: 'Js', page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Js Gym' })]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: 'Js Gym ' + i,
        description: null,
        phone: null,
        latitude: -23.4708365,
        longitude: -46.6522294,
      });
    }

    const { gyms } = await sut.execute({ query: 'Js', page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Js Gym 21' }),
      expect.objectContaining({ title: 'Js Gym 22' }),
    ]);
  });
});
