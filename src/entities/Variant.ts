import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductVariant } from "./ProductVariant";
import { VariantValue } from "./VariantValue";

@Entity()
export class Variant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => VariantValue, (e) => e.variant)
  VariantValues: VariantValue[];

  @ManyToMany(() => ProductVariant, (e) => e.variants)
  @JoinTable({ name: "productVariant_variant" })
  productVariants: ProductVariant[];
}
