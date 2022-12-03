import { queryItems } from "../common/type";

export interface createCategory {
  name: string;
  description: string;
  thumbnail: string;
}

export interface updateCategory extends createCategory {}

export interface getAllCategory extends queryItems {}
