import { User } from '../../user/user.entity';

export class RegisterResponse extends User {
  access_token: string;
}
