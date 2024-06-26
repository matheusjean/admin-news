import httpClient from "../http-client";
import NewsForCreate from "../models/for-create/news";
import News from "../models/news";
import NewsData from "../models/newsData";

interface NewsRequest {
  id?: string;
  isActive?: boolean;
}

interface NewsCreateUpdate {
  hat?: string;
  title?: string;
  text?: string;
  author?: string;
  image?: string;
  link?: string;
  isHighlighted?: number;
  isActive?: boolean;
  categoryIds?: string[];
  categoriesToRemove?: string[];
}

const getNews = async (newsId: string): Promise<News> => {
  const news = (await httpClient.get(`news/${newsId}`)).data;

  return news;
};

const createNews = async (newNews: NewsForCreate) => {
  const createNewsResponse = (
    await httpClient.post<NewsForCreate>(`news`, newNews)
  ).data;

  return createNewsResponse;
};

const getAllNews = async (): Promise<NewsData[] | any> => {
  const news = await httpClient.get("news");

  return news;
};

const deleteNews = async (newsId: string) => {
  await httpClient.delete(`news/${newsId}`);
};

const updateNewsById = async (
  newsId: string,
  data: NewsRequest
): Promise<NewsData> => {
  return (await httpClient.put(`news/${newsId}`, data)).data;
};

const updateNews = async (
  newsId: string,
  newsToBeUpdated?: NewsCreateUpdate
): Promise<News> => {
  const news = (await httpClient.put(`news/${newsId}`, newsToBeUpdated)).data;

  return news;
};

export {
  getNews,
  createNews,
  getAllNews,
  deleteNews,
  updateNewsById,
  updateNews,
};
