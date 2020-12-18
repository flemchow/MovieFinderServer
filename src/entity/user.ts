import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  userId!: number;
  @Column()
  username!: string;
  @Column()
  password!: string;
  @Column()
  rToken?: string;
}
