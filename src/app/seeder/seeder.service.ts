import { Injectable, Logger } from '@nestjs/common';
import { RoleService } from '../api/v1/role/role.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private readonly roleService: RoleService,
  ) {}

  async seed() {
    await this.roles()
      .then(completed => {
        this.logger.log('Successfuly completed seeding role', 'Seeder');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding role', null, 'Seeder');
        Promise.reject(error);
      });
  }

  async roles() {
    return await Promise.all(this.roleService.seed())
      .then(roles => {
        this.logger.log(
          'Number of roles created : ' +
            roles.filter(nullValueOrCreatedType => nullValueOrCreatedType)
              .length,
          'Seeder',
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}
