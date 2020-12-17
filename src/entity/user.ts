import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;
  @Column()
  username!: string;
  @Column()
  password!: string;
  @Column()
  rToken!: string;
}
