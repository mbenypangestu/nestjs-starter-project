import { Role } from '../role/role.entity';

export interface IUser {
  name: string;
  cashtag: string;
  email: string;
  password?: string;
  nik: string;
  phone: string;
  place_birth?: string;
  date_birth?: string;
  gender?: string;
  photo?: string;
  role: Role;
}
