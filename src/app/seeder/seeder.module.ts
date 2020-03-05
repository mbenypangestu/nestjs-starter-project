import { Module, Logger } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from '../api/v1/role/role.service';
import { Role } from '../api/v1/role/role.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Role])],
  providers: [Logger, SeederService, RoleService],
})
export class SeederModule {}
