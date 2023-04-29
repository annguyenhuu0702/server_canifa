import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentItem } from "./PaymentItem";
import { User } from "./User";

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  fullname: string;

  @Column({ default: "" })
  phone: string;

  @Column({ default: "" })
  city: string;

  @Column({ default: "" })
  district: string;

  @Column({ default: "" })
  ward: string;

  @Column({ default: "" })
  street: string;

  @Column({ default: 1 })
  payment: number;

  @Column({ default: "Chờ xử lí" })
  status: string;

  @Column()
  userId: number;

  @Column({ default: 0 })
  point: number;

  @Column()
  shippingCost: number;

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => PaymentItem, (e) => e.payment)
  paymentItems: PaymentItem[];

  @ManyToOne(() => User, (e) => e.payments)
  user: User;
}
