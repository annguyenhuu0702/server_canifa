import { queryItems } from "../common/type";

export interface createUser extends updateUser {
  password: string;
}

export interface updateUser {
  email: string;
  avatar: string;
  fullname: string;
  phone: string;
  gender: boolean;
}

export interface deleteUser {
  id: string | number;
}

export interface getAllUser extends queryItems {}
