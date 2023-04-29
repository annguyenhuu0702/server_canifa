import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BaseEntity,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Comment } from "./Comment";
import { Payment } from "./Payment";

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
  address: string;

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

  @Column({
    default: 0,
  })
  accumulatedPoints: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Comment, (e) => e.user)
  comments: Comment[];

  @OneToMany(() => Payment, (e) => e.user)
  payments: Payment[];
}
