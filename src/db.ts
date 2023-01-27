import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Category } from "./entities/Category";
import { Collection } from "./entities/Collection";
import { ProductCategory } from "./entities/ProductCategory";
import { Product } from "./entities/Product";
import { ProductVariant } from "./entities/ProductVariant";
import { Variant } from "./entities/Variant";
import { VariantValue } from "./entities/VariantValue";
import { ProductImage } from "./entities/ProductImage";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "hoacomuadong5",
  database: "canifa",
  synchronize: true,
  logging: true,
  entities: [
    User,
    Category,
    Collection,
    ProductCategory,
    Product,
    ProductVariant,
    Variant,
    VariantValue,
    ProductImage,
  ],
});
