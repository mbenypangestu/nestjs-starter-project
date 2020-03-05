import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { Parent } from '../parent/parent.entity';
import { ParentService } from '../parent/parent.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Parent])],
  providers: [UserService, RoleService, ParentService],
  controllers: [UserController],
})
export class UserModule {}
