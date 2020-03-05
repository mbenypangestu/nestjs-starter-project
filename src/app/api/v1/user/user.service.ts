import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';
import { RoleService } from '../role/role.service';
import { IUser } from './user.interface';
import { ParentService } from '../parent/parent.service';
import { IParent } from '../parent/parent.interface';
import { uploadFile } from '../../../google/storage/storage';

export enum roleEnum {
  PARENT = 1,
  CHILD = 2,
  MERCHANT = 3,
}

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    private readonly roleService: RoleService,
    private readonly parentService: ParentService,
  ) {
    super(repo);
  }

  async findById(id: number, relations?: string[]): Promise<User> {
    const result = await this.repo.findOne(id, {
      relations,
    });

    if (!result) {
      throw new NotFoundException('User not found.');
    }
    return result;
  }

  async findWhereOne(
    conditions: {},
    relations?: string[],
  ): Promise<User | undefined> {
    try {
      return await this.repo.findOne({ where: conditions, relations });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findWhereMany(
    conditions: {},
    relations?: string[],
  ): Promise<User[] | null> {
    try {
      return await this.repo.find({ where: conditions, relations });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(
    registerDto: RegisterDto,
    @UploadedFile() photo,
  ): Promise<User> {
    try {
      const { role_id, ...user } = registerDto;

      const role = await this.roleService.findById(role_id);

      user.password = await hashSync(user.password, 10);

      if (!(await this.isValidCashtag(user.cashtag)))
        throw new BadRequestException('Cashtag is already exist', 'cashtag');

      if (!(await this.isValidEmail(user.email)))
        throw new BadRequestException('Email is already exist', 'email');

      if (!(await this.isValidPhone(user.phone)))
        throw new BadRequestException('Phone is already exist', 'phone');

      if (!(await this.isValidNik(user.nik)))
        throw new BadRequestException('NIK is already exist', 'nik');

      user.photo = null;
      if (photo !== null || photo !== undefined) {
        const imgUrl = await uploadFile(
          'jeniuskids-storage',
          photo,
          'user/' + user.cashtag + '/profile/',
          user.cashtag,
        );
        user.photo = imgUrl;
      }

      const newUser: IUser = {
        ...user,
        role,
      };

      if (Number(role_id) === roleEnum.PARENT) {
        const createUser = await this.repo.save(newUser);

        const parent: IParent = {
          user: createUser,
          balance: 0,
        };

        await this.parentService.create(parent);

        return createUser;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async isValidAttributes(conditions: {}): Promise<boolean> {
    try {
      if (await this.repo.findOne({ where: conditions })) return false;
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async isValidCashtag(cashtag: string): Promise<boolean> {
    return await this.isValidAttributes({ cashtag: cashtag });
  }

  async isValidEmail(email: string): Promise<boolean> {
    return await this.isValidAttributes({ email: email });
  }

  async isValidPhone(phone: string): Promise<boolean> {
    return await this.isValidAttributes({ phone: phone });
  }

  async isValidNik(nik: string): Promise<boolean> {
    return await this.isValidAttributes({ nik: nik });
  }
}
