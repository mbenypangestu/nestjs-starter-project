import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Parent } from './parent.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IParent } from './parent.interface';
import { User } from '../user/user.entity';

@Injectable()
export class ParentService extends TypeOrmCrudService<Parent> {
  constructor(@InjectRepository(Parent) repo) {
    super(repo);
  }

  async create(parent: IParent): Promise<Parent> {
    const result = await this.repo.save(parent);

    if (!result) {
      throw new BadRequestException('Failed to create parent !');
    }
    return result;
  }

  async save(parent: IParent): Promise<Parent> {
    const result = await this.repo.save(parent);

    if (!result) {
      throw new BadRequestException('Failed save parent');
    }
    return result;
  }

  async findOneByUser(user: User, relations?: string[]): Promise<Parent> {
    const result = await this.repo.findOne({
      where: { user },
      relations,
    });

    if (!result) throw new NotFoundException('Parent not found');
    return result;
  }
}
