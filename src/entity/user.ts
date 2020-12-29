import {
  BaseEntity as baseEntity,
  Column as column,
  CreateDateColumn as createDateColumn,
  Entity as entity,
  PrimaryGeneratedColumn as primaryGeneratedColumn,
  UpdateDateColumn as updateDateColumn,
} from "typeorm";

@entity()
export default class User extends baseEntity {
  @primaryGeneratedColumn("uuid")
  userId!: number;

  @column()
  email!: string;

  @column()
  username!: string;

  @column()
  password!: string;

  @column()
  rToken!: string;
}
