import {
  Injectable,
  Provider,
  InternalServerErrorException,
  UploadedFile,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity';
import { LoginResponse } from './response/login.response';
import { RegisterResponse } from './response/register.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = this.jwtService.sign(payload);
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async validateUser(cashtag: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findWhereOne({ cashtag });

      if (user && (await compareSync(password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(user: LoginDto): Promise<LoginResponse> {
    try {
      const { password, ...userData } = await this.userService.findWhereOne({
        cashtag: user.cashtag,
      });

      const payload = {
        id: userData.id,
        name: userData.name,
        cashtag: userData.cashtag,
        nik: userData.nik,
        email: userData.email,
        phone: userData.phone,
        place_birth: userData.place_birth,
        date_birth: userData.date_birth,
        gender: userData.gender,
        photo: userData.photo,
      };

      return {
        ...userData,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async register(
    user: RegisterDto,
    @UploadedFile() photo,
  ): Promise<RegisterResponse> {
    try {
      user.role_id = Number(user.role_id);
      const createdUser = await this.userService.register(user, photo);

      const payload = {
        id: createdUser.id,
        name: createdUser.name,
        cashtag: createdUser.cashtag,
        nik: createdUser.nik,
        email: createdUser.email,
        phone: createdUser.phone,
        place_birth: createdUser.place_birth,
        date_birth: createdUser.date_birth,
        gender: createdUser.gender,
        photo: createdUser.photo,
      };

      return {
        ...createdUser,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
