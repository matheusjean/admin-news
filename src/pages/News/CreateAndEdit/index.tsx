import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import Swal from 'sweetalert2'

import BreadCrumb from '../../../components/BreadCrumb'
import Button from '../../../components/Button'
import Form from '../../../components/Form'
import FormInputs from '../../../components/FormInputs'
import Input from '../../../components/Input'
import InputText from '../../../components/InputText'
import Label from '../../../components/Label'
import PageTitle from '../../../components/PageTitle'
import ToggleSwitch from '../../../components/ToggleSwitch'
import checkEmptyString from '../../../helpers/check-empty-string'
import {
  getNews as getNewsService,
  createNews as createNewsResponse,
  updateNews as updateNewsService
} from '../../../services/news'
import { Container, FormButtons } from './styles'

interface CreateAndEditNewsProps {
  newsId: string
}

export default function CreateAndEditNews() {
  const [title, setTitle] = useState('')
  const [hat, setHat] = useState('')
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [image, setImage] = useState('')
  const [link, setLink] = useState('')
  const [isActive, setIsActive] = useState<boolean>(true)
  const { newsId } = useParams<CreateAndEditNewsProps>()

  const isEditting = useMemo(() => {
    if (newsId) {
      return true
    }

    return false
  }, [newsId])

  const getNews = useCallback(async () => {
    if (newsId) {
      try {
        const news = await getNewsService(newsId)
        setTitle(news.title)
        setHat(news.hat)
        setText(news.text)
        setAuthor(news.author)
        setImage(news.image)
        setLink(news.link)
        setIsActive(news.isActive)
      } catch (error) {
        Swal.fire({
          title: 'Erro',
          text: 'Houve um erro ao buscar a notícia. ' + error.message,
          icon: 'error'
        })
      }
    }
  }, [newsId])

  const history = useHistory()

  const createNews = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (checkEmptyString(title)) {
        throw new Error('Informe um nome válido para a notícia.')
      }

      await createNewsResponse({
        title,
        hat,
        text,
        author,
        link,
        isActive,
        image
      })

      Swal.fire({
        title: '',

        text: 'Notícia criada com sucesso!',

        icon: 'success'
      })

      history.push('/news')
    } catch (error) {
      Swal.fire({
        title: 'Erro',

        text: 'Houve um erro ao criar a notícia. ' + error.message,

        icon: 'error'
      })
    }
  }
  const updateNews = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const newsToBeUpdated = {
        title,
        hat,
        text,
        author,
        link,
        isActive,
        image
      }

      await updateNewsService(newsId, newsToBeUpdated)
      Swal.fire({
        title: 'Sucesso!',
        text: 'Notícia editada com sucesso!',
        icon: 'success'
      })
      history.push('/news')
    } catch (error: any) {
      Swal.fire({
        title: 'Erro',
        text: 'Houve um erro ao editar a notícia. ' + error.message,
        icon: 'error'
      })
    }
  }

  useEffect(() => {
    getNews()
  }, [getNews])

  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/home">
            Início
          </Link>,

          <Link key={2} to="/news">
            Notícia
          </Link>,
          <span key={3}>{isEditting ? 'Editar' : 'Criar'} Notícia</span>
        ]}
      />

      <PageTitle>{isEditting ? 'Editar' : 'Criar'} Notícia</PageTitle>

      <Form>
        <FormInputs>
          <Label className="required" htmlFor="title">
            Título
          </Label>

          <Input
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormInputs>

        <FormInputs>
          <Label className="required" htmlFor="hat">
            Hat
          </Label>

          <Input
            id="hat"
            required
            value={hat}
            onChange={(e) => setHat(e.target.value)}
          />
        </FormInputs>

        <FormInputs>
          <Label className="required" htmlFor="author">
            Autor
          </Label>

          <Input
            id="author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </FormInputs>

        <FormInputs>
          <Label className="required" htmlFor="title">
            Imagem LINK
          </Label>

          <Input
            id="title"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormInputs>

        <FormInputs>
          <Label className="required" htmlFor="title">
            Link
          </Label>

          <Input
            id="title"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </FormInputs>

        <ToggleSwitch
          label="Desativar"
          setToggleState={setIsActive}
          isActive={isActive}
        />

        <FormInputs>
          <Label className="required" htmlFor="text">
            Texto
          </Label>

          <InputText
            id="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormInputs>

        <FormButtons>
          <Button
            type="button"
            styleButton="secondButton"
            onClick={() => history.push('/news')}
          >
            Cancelar
          </Button>

          <Button
            styleButton="default"
            onClick={(e) => (isEditting ? updateNews(e) : createNews(e))}
          >
            Salvar
          </Button>
        </FormButtons>
      </Form>
    </Container>
  )
}
