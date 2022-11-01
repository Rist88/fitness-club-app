import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Program } from './program.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @JoinTable()
  @ManyToMany((type) => Program, (program) => program.subscribers)
  subscriptions: Program[];

  @Column()
  userRole: 'coach' | 'user';
}
