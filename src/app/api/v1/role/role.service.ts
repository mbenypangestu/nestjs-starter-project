import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IRole } from './role.interface';
import { roles } from './role.data';

@Injectable()
export class RoleService extends TypeOrmCrudService<Role> {
  constructor(@InjectRepository(Role) repo) {
    super(repo);
  }

  async findById(id: number): Promise<Role> {
    const result = await this.repo.findOne(id);

    if (!result) throw new NotFoundException('Role not found');

    return result;
  }

  seed(): Array<Promise<Role>> {
    return roles.map(async (role: IRole) => {
      return await this.repo
        .findOne(role.id)
        .then(async dbRole => {
          if (dbRole) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.repo.save(role));
        })
        .catch(error => Promise.reject(error));
    });
  }
}
