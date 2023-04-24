type createComment = {
  content: string;
  productId: number;
};

type updateComment = createComment & {};

export type { createComment, updateComment };
