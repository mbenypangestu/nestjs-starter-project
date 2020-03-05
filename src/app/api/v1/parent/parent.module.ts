import { Module } from '@nestjs/common';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './parent.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, User, Role])],
  controllers: [ParentController],
  providers: [ParentService, UserService, RoleService],
})
export class ParentModule {}
