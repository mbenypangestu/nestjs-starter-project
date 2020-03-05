import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  Entity,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { IParent } from './parent.interface';
@Entity()
export class Parent implements IParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  balance: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
