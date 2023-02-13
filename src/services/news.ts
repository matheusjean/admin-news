import httpClient from '../http-client'
import News from '../models/news'

const getAllNews = async (): Promise<News> => {
  const authors = await httpClient.get('news')

  return authors
}

export { getAllNews }
