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
import ToggleSwitch from '../../../components/ToggleSwitch'
import checkEmptyString from '../../../helpers/check-empty-string'
import {  createCategory, getCategoryId, updateCategoriesResponse } from '../../../services/categories'
import { Container, FormButtons } from './styles'

interface CreateAndEditNewsProps {
  categoryId: string
}

export default function CreateAndEditCategory() {
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState<boolean>(true)
  const { categoryId } = useParams<CreateAndEditNewsProps>()

  const isEditting = useMemo(() => {
    if (categoryId) {
      return true
    }

    return false
  }, [categoryId])


  const getCategories = useCallback(async () => {
    if (categoryId) {
      try {
        const category = await getCategoryId(categoryId);

        setName(category.name);
        setIsActive(category.isActive);

      } catch (error) {
        Swal.fire({
          title: 'Erro',
          text: 'Houve um erro ao buscar a categoria. ' + error.message,
          icon: 'error',
        });
      }
    }
  }, [categoryId]);

  const history = useHistory()

  const createCategoryModel = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (checkEmptyString(name)) {
        throw new Error('Informe um nome válido para a categoria.')
      }

       await createCategory({
         name,
         isActive,
       })

      Swal.fire({
        title: '',

        text: 'Categoria criada com sucesso!',

        icon: 'success'
      })

      history.push('/category')
    } catch (error) {
      Swal.fire({
        title: 'Erro',

        text: 'Houve um erro ao criar a categoriaa. ' + error.message,

        icon: 'error'
      })
    }
  }

  const updateCategory = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const categoryToBeUpdated = {
        name,
        isActive
      }

      await updateCategoriesResponse(categoryId, categoryToBeUpdated)
      Swal.fire({
        title: 'Sucesso!',
        text: 'Categoria editada com sucesso!',
        icon: 'success'
      })
      history.push('/category')
    } catch (error: any) {
      Swal.fire({
        title: 'Erro',
        text: 'Houve um erro ao editar a categoria. ' + error.message,
        icon: 'error'
      })
    }
  }

  useEffect(() => {
    getCategories()
  }, [getCategories])


  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/">
            Início
          </Link>,

          <Link key={2} to="/category">
            Categoria
          </Link>,
          <span key={3}>{isEditting ? 'Editar' : 'Criar'} Categoria</span>
        ]}
      />

      <PageTitle>{isEditting ? 'Editar' : 'Criar'} Categoria</PageTitle>

      <Form>
        <FormInputs>
          <Label className="required" htmlFor="title">
            Nome
          </Label>

          <Input
            id="title"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormInputs>

        <ToggleSwitch
          label="Desativar"
          setToggleState={setIsActive}
          isActive={isActive}
        />

        <FormButtons>
          <Button
            type="button"
            styleButton="secondButton"
            onClick={() => history.push('/category')}
          >
            Cancelar
          </Button>

          <Button
            styleButton="default"
            onClick={(e) => (isEditting ? updateCategory(e) : createCategoryModel(e))}
          >
            Salvar
          </Button>
        </FormButtons>
      </Form>
    </Container>
  )
}
