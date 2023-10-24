import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import Swal from 'sweetalert2'

import BreadCrumb from '../../../components/BreadCrumb'
import Button from '../../../components/Button'
import Form from '../../../components/Form'
import FormInputs from '../../../components/FormInputs'
import Input from '../../../components/Input'
import Label from '../../../components/Label'
import PageTitle from '../../../components/PageTitle'
import RichTextEditor from '../../../components/RichText';
import InputSelect from '../../../components/Select'
import ToggleSwitch from '../../../components/ToggleSwitch'
import checkEmptyString from '../../../helpers/check-empty-string'
import Categories from '../../../models/categories'
import { getAllCategories } from '../../../services/categories'
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
  const [text, setText] = useState('Valor Inicial')
  const [image, setImage] = useState('https://noticias.maisesports.com.br/wp-content/uploads/2023/06/cs-2-inferno-4.jpg')
  const [link, setLink] = useState('deixe vazio')
  const [isActive, setIsActive] = useState<boolean>(true)
  const [isHighlighted, setIsHighlighted] = useState<number>()
  const [categories, setCategories] = useState<Categories>()
  const [categoriesSelected, setCategoriesSelected] = useState(
    [] as { label: string; value: string }[]
  )
  const [categoriesToRemove, setCategoriesToRemove] = useState<string[]>([]);
  const { newsId } = useParams<CreateAndEditNewsProps>()

  const isEditting = useMemo(() => {
    if (newsId) {
      return true
    }

    return false
  }, [newsId])

  const getCategories = async () => {
    try {
      const allCategories = await getAllCategories();
      if (allCategories.data && allCategories.data.length > 0) {
        setCategories(allCategories);
      }
    } catch (error) {
      console.error("Erro ao obter categorias:", error);
    }
  }

  const getNews = useCallback(async () => {
    if (newsId) {
      try {
        const news = await getNewsService(newsId);

        setTitle(news.title);
        setHat(news.hat);
        setText(news.text);
        setImage(news.image);
        setLink(news.link);
        setIsHighlighted(news.isHighlighted)
        setIsActive(news.isActive);

        const newsCategories = news.categories;

        const categoryObjects = newsCategories.map((category) => ({
          label: category.name,
          value: category.id
        }));

        setCategoriesSelected(categoryObjects);
      } catch (error) {
        Swal.fire({
          title: 'Erro',
          text: 'Houve um erro ao buscar a notícia. ' + error.message,
          icon: 'error',
        });
      }
    }
  }, [newsId]);

  const history = useHistory()

  const createNews = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (checkEmptyString(title)) {
        throw new Error('Informe um nome válido para a notícia.')
      }
      const selectedCategoryIds = categoriesSelected.map((category) => category.value);

      await createNewsResponse({
        title,
        hat,
        text,
        link,
        isActive,
        image,
        isHighlighted,
        categoryIds: selectedCategoryIds,
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
    event.preventDefault();

    const selectedCategoryIds = categoriesSelected.map((category) => category.value);

    try {
      if (categoriesToRemove.length > 0) {
        const newsToBeUpdated = {
          categoriesToRemove
        };
        await updateNewsService(newsId, newsToBeUpdated);
      }
      setCategoriesToRemove([]);

      const uniqueSelectedCategoryIds = selectedCategoryIds.filter(
        (categoryId) => categoriesSelected.some((category) => category.value === categoryId)
      );

      const newsToBeUpdated = {
        title,
        hat,
        text,
        link,
        isActive,
        image,
        categoryIds: uniqueSelectedCategoryIds && selectedCategoryIds
      };

      await updateNewsService(newsId, newsToBeUpdated);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Notícia editada com sucesso!',
        icon: 'success'
      });
      history.push('/news');
    } catch (error: any) {
      Swal.fire({
        title: 'Erro',
        text: 'Houve um erro ao editar a notícia. ' + error.message,
        icon: 'error'
      });
    }
  };

  useEffect(() => {
    getNews()
    getCategories()
  }, [getNews])

  const categoriesToBeShown = useMemo(() => {
    if (categories && categories.data && categories.data.length > 0) {
      return categories.data.map((tag) => ({
        label: tag.name,
        value: `${tag.id}`
      }));
    } else {
      return [];
    }
  }, [categories]);

  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/">
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
          <Label className="required" htmlFor="destaque">
            DESTAQUE ? insira (1, 2 ou 3) apenas
          </Label>

          <Input
            id="destaque"
            type="number"
            value={isHighlighted}
            onChange={(e) => setIsHighlighted(e.target.value)}
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

        <InputSelect
          title="Categorias"
          options={categoriesToBeShown}
          value={categoriesSelected}
          closeMenuOnSelect={false}
          onChange={(options) => {
            if (options && !isNaN(options.length)) {
              const removedCategories = categoriesSelected.filter(
                (category) => !options.find((opt) => opt.value === category.value)
              );

              setCategoriesToRemove(removedCategories.map((cat) => cat.value));

              setCategoriesSelected(options);
            } else {
              const allCategoryValues = categoriesSelected.map((cat) => cat.value);
              setCategoriesToRemove(allCategoryValues);
              setCategoriesSelected([]);
            }
          }}
        />

        <ToggleSwitch
          label="Desativar"
          setToggleState={setIsActive}
          isActive={isActive}
        />

        <FormInputs>
          <Label className="required" htmlFor="text">
            Texto
          </Label>

          <RichTextEditor teste={text} onChange={setText} />

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
