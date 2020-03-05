import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'cashtag',
      passwordField: 'password',
    });
  }

  async validate(cashtag: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(cashtag, password);
    if (!user) {
      throw new UnauthorizedException('Cashtag or password is invalid');
    }
    return user;
  }
}
