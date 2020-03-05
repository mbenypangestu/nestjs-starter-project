import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { CustomConfigModule } from '../../../config/custom-config/custom-config.module';
import { CustomConfigService } from '../../../config/custom-config/custom-config.service';
import { Parent } from '../parent/parent.entity';
import { ParentService } from '../parent/parent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Parent]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [CustomConfigModule],
      useFactory: async (customConfigService: CustomConfigService) => ({
        secret: customConfigService.jwtSecretKey,
      }),
      inject: [CustomConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    UserService,
    RoleService,
    ParentService,
  ],
})
export class AuthModule {}
