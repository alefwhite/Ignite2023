import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

// UNIT TEST
// @ts-ignore

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();

    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Js Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.4708365),
      longitude: new Decimal(-46.6522294),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.4708365,
      userLongitude: -46.6522294,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // red, green, refactor
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 7, 22, 16, 35, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.4708365,
      userLongitude: -46.6522294,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.4708365,
        userLongitude: -46.6522294,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to check in twice in the different day', async () => {
    vi.setSystemTime(new Date(2023, 7, 22, 16, 35, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.4708365,
      userLongitude: -46.6522294,
    });

    vi.setSystemTime(new Date(2023, 7, 23, 16, 35, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.4708365,
      userLongitude: -46.6522294,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Js Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.4869898),
      longitude: new Decimal(-46.6488405),
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.4710102,
        userLongitude: -46.6565327,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
