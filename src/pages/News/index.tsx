import react, { useEffect, useState, useCallback, useMemo } from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { Link, useHistory } from 'react-router-dom'

import Swal from 'sweetalert2'

import Box from '../../components/Box'
import BreadCrumb from '../../components/BreadCrumb'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/Table'
import NewsModel from '../../models/newsData'
import { deleteNews, getAllNews, updateNewsById } from '../../services/news'
import { Container } from './styles'

export default function News() {
  const [news, setNews] = useState<NewsModel>()

  const history = useHistory()

  const createNews = (): void => {
    history.push('create-news')
  }

  const editNews = useCallback(
    (newsId: string) => {
      history.push(`edit-news/${newsId}`)
    },
    [history]
  )

  const getNews = useCallback(async () => {
    const allNews = await getAllNews()
    console.log({allNews});

    if (allNews.data && allNews.data.length >= 0) {
      setNews(allNews)
    }
  }, [])

  useEffect(() => {
    getNews()
  }, [getNews])

  const removeNews = useCallback(
    async (newsId: string) => {
      Swal.fire({
        title: '<strong>Confirmação</strong>',

        html: 'Tem certeza que deseja remover esta notícia?',

        showCancelButton: true,

        cancelButtonText: 'Cancelar',

        focusConfirm: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteNews(newsId)

            Swal.fire({
              icon: 'success',

              title: 'Sucesso!',

              text: 'Notícia excluída com sucesso!'
            })

            await getNews()
          } catch (error) {
            Swal.fire({
              icon: 'error',

              title: 'Erro',

              text: `Erro ao excluir notícia. ${error.response ? 'Esta não foi excluída' : error.message
                }`
            })
          }
        }
      })
    },
    [getNews]
  )

  const inactivateNews = useCallback(
    async (newsId: string, isActive: boolean) => {
      Swal.fire({
        title: '<strong>Confirmação</strong>',
        icon: 'question',
        html: 'Tem certeza que deseja intativar esta notícia?',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // eslint-disable-next-line object-shorthand
            await updateNewsById(newsId, { isActive: isActive })

            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Notícia inativada com sucesso!'
            })
            await getNews()
          } catch (e) {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao inativar notícia',
              text: e.message
            })
          }
        }
      })
    },
    [getNews]
  )

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

        categoria: Array.isArray(news.categories)
          ? news.categories.map((category) => {
            if (typeof category === 'object' && category.name) {
              return category.name;
            }
            return '';
          }).join(', ')
          : '',

        title: news.title,

        hat: news.hat,

        active: (
          <div
            style={{
              display: 'flex',

              gap: '5px'
            }}
          >
            {news.isActive ? (
              <>
                <AiOutlineCheck size={25} />
              </>
            ) : (
              <>
                <AiOutlineClose size={25} />
              </>
            )}
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
              onClick={() => editNews(news.id)}
            >
              <div>
                <AiOutlineEdit className="icon-danger" />
              </div>
            </Button>

            <Button
              className="small danger"
              title="Inativar noticia"
              styleButton="attencion"
              onClick={() => {
                inactivateNews(news.id, !news.isActive)
              }}
            >
              <div>
                <AiOutlineClose className="icon-danger" />
              </div>
            </Button>

            <Button
              className="small danger"
              title="Excluir noticia"
              styleButton="danger"
              onClick={() => removeNews(news.id)}
            >
              <div>
                <BiTrash className="icon-danger" />
              </div>
            </Button>
          </div>
        )
      }))
      : []
  }, [news, removeNews, inactivateNews, editNews])

  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/">
            Início
          </Link>,

          <span key={2}>Notícias</span>
        ]}
      />

      <PageTitle>Notícias</PageTitle>

      <Box padding="0 0 20px 0">
        <Button onClick={createNews}>CRIAR NOTÍCIA</Button>
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
            headerLabel: <span>Categorias</span>,

            propName: 'categoria'
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
