import { queryItems } from "../common/type";

type createComment = {
  content: string;
  productId: number;
};

type updateComment = createComment & {};

type getAllComment = queryItems & {
  fullname?: string;
};

export type { createComment, updateComment, getAllComment };
