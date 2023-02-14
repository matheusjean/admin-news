import httpClient from '../http-client'
import News from '../models/news'

interface NewsRequest {
  id?: string
  isActive?: boolean
}

const getAllNews = async (): Promise<News> => {
  const authors = await httpClient.get('news')

  return authors
}

const deleteNews = async (newsId: string) => {
  await httpClient.delete(`news/${newsId}`)
}

const updateNewsById = async (
  newsId: string,
  data: NewsRequest
): Promise<News> => {
  return (await httpClient.put(`news/${newsId}`, data)).data
}

export { getAllNews, deleteNews, updateNewsById }
