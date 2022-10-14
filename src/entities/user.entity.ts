import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
