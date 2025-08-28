import { Injectable, Logger } from '@nestjs/common';
import { UserSearchDTO } from '../Protocols/DTO';
import { Role, UserEntity } from '../Protocols/Entities';
import { InternalException } from 'src/Presentation/Exceptions';
import { PrismaHelper } from 'src/Infra/prisma';
import { UnexpectedError } from 'src/Presentation/Errors';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly prismaHelper: PrismaHelper) {}

  async getMany(filters?: UserSearchDTO): Promise<UserEntity[]> {
    try {
      const entities = await this.prismaHelper.user.findMany({
        where: filters,
        orderBy: {
          firstName: 'asc',
        },
      });

      return entities.map((entity) => {
        return {
          ...entity,
          role: Role[entity.role],
        };
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalException({
        stack: e,
      });
    }
  }

  async getFirst(filters?: UserSearchDTO): Promise<UserEntity | null> {
    try {
      const entity = await this.prismaHelper.user.findFirst({
        where: filters,
        orderBy: {
          firstName: 'asc',
        },
      });

      return entity
        ? {
            ...entity,
            role: Role[entity.role],
          }
        : null;
    } catch (e) {
      this.logger.error(e);
      throw new UnexpectedError({
        stack: e,
      });
    }
  }

  async createOne(
    userData: Omit<UserEntity, 'id' | 'createdAt' | 'modifiedAt'>,
  ): Promise<UserEntity | null> {
    try {
      const entity = await this.prismaHelper.user.create({
        data: userData,
      });

      return entity
        ? {
            ...entity,
            password: undefined,
            role: Role[entity.role],
          }
        : null;
    } catch (e) {
      this.logger.error(e);
      throw new InternalException({
        stack: e,
      });
    }
  }

  async updateOne(userId: string, userData: Partial<UserEntity>): Promise<UserEntity | null> {
    try {
      const entity = await this.prismaHelper.user.update({
        data: userData,
        where: {
          id: userId,
        },
      });

      return entity
        ? {
            ...entity,
            password: undefined,
            role: Role[entity.role],
          }
        : null;
    } catch (e) {
      this.logger.error(e);
      throw new InternalException({
        stack: e,
      });
    }
  }
}
