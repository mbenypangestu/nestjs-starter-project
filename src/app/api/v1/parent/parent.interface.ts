import { User } from '../user/user.entity';

export interface IParent {
  balance: number;
  user?: User;
}
