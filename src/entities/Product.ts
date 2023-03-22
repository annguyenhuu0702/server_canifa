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
  Unique,
} from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { ProductImage } from "./ProductImage";
import { ProductVariant } from "./ProductVariant";

@Unique(["code"])
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productCategoryId: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  slug: string;

  @Column({ default: "" })
  thumbnail: string;

  @Column({ default: "" })
  description: string;

  @Column()
  price: number;

  @Column()
  priceSale: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ProductVariant, (e) => e.product)
  productVariants: ProductVariant[];

  @OneToMany(() => ProductImage, (e) => e.product)
  productImages: ProductImage[];

  @ManyToOne(() => ProductCategory, (e) => e.products)
  productCategory: ProductCategory;
}
