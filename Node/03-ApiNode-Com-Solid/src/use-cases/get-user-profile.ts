import { User } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { IUsersRepository } from '@/repositories/users-repository';

interface IGetUserProfileUseCaseRequest {
  userId: string;
}

interface IGetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}
