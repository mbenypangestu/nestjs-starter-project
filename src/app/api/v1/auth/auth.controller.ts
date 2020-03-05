import {
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { CurrentUser } from '../../../decorator/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async login(@Body() user: LoginDto): Promise<User> {
    return await this.authService.login(user);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: RegisterDto,
  })
  async register(
    @Body() user: RegisterDto,
    @UploadedFile() photo,
  ): Promise<User> {
    return this.authService.register(user, photo);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async currentUser(@CurrentUser() user: User) {
    return user;
  }
}
