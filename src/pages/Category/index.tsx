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
import CategoryData from '../../models/categoryData'
import { deleteCategory, getCategory, updateCategoryById } from '../../services/categories'
import { Container } from './styles'

export default function Category() {
  const [category, setCategory] = useState<CategoryData[]>([])

  const history = useHistory()

  const createNews = (): void => {
    history.push('create-category')
  }

  const editCategory = useCallback(
    (categoryId: string) => {
      history.push(`edit-category/${categoryId}`)
    },
    [history]
  )

  const getCategories = useCallback(async () => {
    try {
      const allCategories = await getCategory();

      if (Array.isArray(allCategories)) {
        setCategory(allCategories);
      }
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
    }
  }, []);

  const removeCategory = useCallback(
    async (categoryId: string) => {
      Swal.fire({
        title: '<strong>Confirmação</strong>',

        html: 'Tem certeza que deseja remover esta categoria?',

        showCancelButton: true,

        cancelButtonText: 'Cancelar',

        focusConfirm: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteCategory(categoryId)

            Swal.fire({
              icon: 'success',

              title: 'Sucesso!',

              text: 'Categoria excluída com sucesso!'
            })

            await getCategories()
          } catch (error) {
            Swal.fire({
              icon: 'error',

              title: 'Erro',

              text: `Erro ao excluir categoria. ${error.response ? 'Esta categoria não foi excluída' : error.message
                }`
            })
          }
        }
      })
    },
    [getCategories]
  )

  const inactivateCategory = useCallback(
    async (newsId: string, isActive: boolean) => {
      Swal.fire({
        title: '<strong>Confirmação</strong>',
        icon: 'question',
        html: 'Tem certeza que deseja intativar esta categoria?',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateCategoryById(newsId, { isActive })

            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'categoria inativada com sucesso!'
            })
            await getCategories()
          } catch (e) {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao inativar categoria',
              text: e.message
            })
          }
        }
      })
    },
    []
  )

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const categoriesToBeShown = useMemo(() => {
    return category
      ? category.map((cat) => ({
        id: cat.id,

        name: cat.name,

        active: (
          <div
            style={{
              display: 'flex',

              gap: '5px'
            }}
          >
            {cat.isActive ? (
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
              onClick={() => editCategory(cat.id)}
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
                inactivateCategory(cat.id, !cat.isActive)
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
              onClick={() => removeCategory(cat.id)}
            >
              <div>
                <BiTrash className="icon-danger" />
              </div>
            </Button>
          </div>
        )


      }))
      : []
  }, [category, removeCategory, inactivateCategory, editCategory])


  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/">
            Início
          </Link>,

          <span key={2}>Categorias</span>
        ]}
      />

      <PageTitle>Categorias</PageTitle>

      <Box padding="0 0 20px 0">
        <Button onClick={createNews}>CRIAR CATEGORIA</Button>
      </Box>

      <Table
        headersConfig={[
          {
            headerLabel: <Checkbox />,

            propName: 'selectAll'
          },

          {
            headerLabel: <span>Name</span>,

            propName: 'name'
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
        itemsToShow={categoriesToBeShown}
        emptyListMessage={'Não foram encontradas categorias cadastradas!'}
      />
    </Container>
  )
}
