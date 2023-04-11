import { queryItems } from "../common/type";

type createNews = {
  title: string;
  content: string;
  userId: number;
  thumbnail: string;
};

type updateNews = createNews & {};

type getAllNews = queryItems & {
  title?: string;
};

export type { createNews, updateNews, getAllNews };
