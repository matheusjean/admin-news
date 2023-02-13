import react, { useEffect, useState, useCallback, useMemo } from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import Box from '../../components/Box'
import BreadCrumb from '../../components/BreadCrumb'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/Table'
import NewsModel from '../../models/news'
import { getAllNews } from '../../services/news'
import { Container } from './styles'

export default function News() {
  const [news, setNews] = useState<NewsModel>()
  const getNews = useCallback(async () => {
    const allNews = await getAllNews()

    if (allNews.data && allNews.data.length >= 0) {
      setNews(allNews)
    }
  }, [])

  useEffect(() => {
    getNews()
  }, [getNews])

  const newsToBeShown = useMemo(() => {
    return news
      ? news.data.map((news) => ({
          selectAll: (
            <div
              style={{
                display: 'flex',

                gap: '5px'
              }}
            >
              <Checkbox />
            </div>
          ),

          id: news.id,

          title: news.title,

          hat: news.hat,

          active: (
            <div
              style={{
                display: 'flex',

                gap: '5px'
              }}
            >
              <AiOutlineCheck size={25} />
            </div>
          ),

          actions: (
            <div
              style={{
                display: 'flex',

                gap: '5px'
              }}
            >
              <Button
                className="small danger"
                title="Editar notícia"
                styleButton="edit"
              >
                <div>
                  <AiOutlineEdit className="icon-danger" />
                </div>
              </Button>

              <Button
                className="small danger"
                title="Inativar noticia"
                styleButton="attencion"
              >
                <div>
                  <AiOutlineClose className="icon-danger" />
                </div>
              </Button>

              <Button
                className="small danger"
                title="Excluir noticia"
                styleButton="danger"
              >
                <div>
                  <BiTrash className="icon-danger" />
                </div>
              </Button>
            </div>
          )
        }))
      : []
  }, [news])

  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/home">
            Início
          </Link>,

          <span key={2}>Notícias</span>
        ]}
      />

      <PageTitle>Notícias</PageTitle>

      <Box padding="0 0 20px 0">
        <Button>CRIAR NOTÍCIA</Button>
      </Box>

      <Table
        headersConfig={[
          {
            headerLabel: <Checkbox />,

            propName: 'selectAll'
          },

          {
            headerLabel: <span>Titulos</span>,

            propName: 'title'
          },

          {
            headerLabel: <span>Hat</span>,

            propName: 'hat'
          },

          {
            headerLabel: <span>Ativo</span>,

            propName: 'active'
          },

          {
            headerLabel: <span>Ações</span>,

            propName: 'actions'
          }
        ]}
        foot
        itemsToShow={newsToBeShown}
        emptyListMessage={'Não foram encontradas notícias cadastradas!'}
      />
    </Container>
  )
}
