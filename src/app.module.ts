import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as NestConfigModule from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/api/v1/auth/auth.module';
import { UserModule } from './app/api/v1/user/user.module';
import { RoleModule } from './app/api/v1/role/role.module';
import { CustomConfigModule } from './app/config/custom-config/custom-config.module';
import { SeederModule } from './app/seeder/seeder.module';
import { ParentModule } from './app/api/v1/parent/parent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
    ConfigModule,
    AuthModule,
    UserModule,
    RoleModule,
    CustomConfigModule,
    SeederModule,
    ParentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
