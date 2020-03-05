import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './user.interface';

@Entity()
@Unique(['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  cashtag: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  password?: string;

  @Column()
  @ApiProperty()
  nik: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column({ nullable: true })
  @ApiProperty()
  place_birth?: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty()
  date_birth?: string;

  @Column({ nullable: true })
  @ApiProperty()
  gender?: string;

  @Column({ nullable: true })
  @ApiProperty()
  photo?: string;

  @ManyToOne(
    type => Role,
    role => role.id,
  )
  role: Role;
}
