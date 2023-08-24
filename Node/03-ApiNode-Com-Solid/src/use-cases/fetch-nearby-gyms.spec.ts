import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms';

// UNIT TEST
// @ts-ignore

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();

    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.4708365,
      longitude: -46.6522294,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -23.6010078,
      longitude: -46.7200394,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.4708365,
      userLongitude: -46.6522294,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
