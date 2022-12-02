import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BaseEntity,
  DeleteDateColumn,
} from "typeorm";

@Unique(["email"])
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  hash: string;

  @Column({ default: new Date() })
  birthday: Date;

  @Column({ default: "" })
  city: string;

  @Column({ default: "" })
  ward: string;

  @Column({ default: "" })
  district: string;

  @Column({ default: "" })
  street: string;

  @Column({
    default: "",
  })
  avatar: string;

  @Column({
    default: "",
  })
  phone: string;

  @Column({
    default: true,
  })
  gender: boolean;

  @Column({
    default: "user",
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
