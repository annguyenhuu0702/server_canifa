import { queryItems } from "../common/type";

type createPayment = {
  fullname: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  payment: number;
  point: number;
  shippingCost: number;
  totalPrice: number;
};

type updatePayment = createPayment & {
  status: string;
};

type getAllPayment = queryItems & {
  fullname?: string;
  phone?: string;
};

export type { createPayment, updatePayment, getAllPayment };
