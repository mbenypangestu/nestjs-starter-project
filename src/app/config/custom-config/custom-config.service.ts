import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomConfigService {
  get jwtSecretKey(): string {
    return process.env.JWT_SECRET_KEY;
  }
}
