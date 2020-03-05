import { User } from '../../user/user.entity';

export class LoginResponse extends User {
  access_token: string;
}
