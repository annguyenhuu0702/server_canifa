import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { VariantValue } from "./VariantValue";

@Entity()
export class ProductVariant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column()
  inventory: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Product, (e) => e.productVariants)
  product: Product;

  @ManyToMany(() => VariantValue, (e) => e.productVariants)
  @JoinTable({ name: "productVariant_variantValues" })
  variantValues: VariantValue[];
}
