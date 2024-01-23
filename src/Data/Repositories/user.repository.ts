import { Injectable, Module } from '@nestjs/common';
import { UserSearchDTO } from '../Protocols/DTO';
import { Role, UserEntity } from '../Protocols/Entities';
import { InternalException } from 'src/Presentetion/Exceptions';
import { PrismaHelper, PrismaModule } from 'src/Infra/prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaHelper: PrismaHelper) {}

  async getMany(filters?: UserSearchDTO): Promise<UserEntity[]> {
    try {
      const entities = await this.prismaHelper.user.findMany({
        where: filters,
        orderBy: {
          username: 'asc',
        },
      });

      return entities.map((entity) => {
        return {
          ...entity,
          role: Role[entity.role],
        };
      });
    } catch (e) {
      throw new InternalException();
    }
  }

  async getFirst(filters?: UserSearchDTO): Promise<UserEntity | null> {
    try {
      const entity = await this.prismaHelper.user.findFirst({
        where: filters,
        orderBy: {
          username: 'asc',
        },
      });

      return entity
        ? {
            ...entity,
            role: Role[entity.role],
          }
        : null;
    } catch (e) {
      throw new InternalException();
    }
  }
}
