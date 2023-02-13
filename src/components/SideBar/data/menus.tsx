import { BiNews, BiCategoryAlt } from 'react-icons/bi'

export const dashboard = {
  label: (
    <>
      <span className="text">Início</span>
    </>
  ),
  path: '/'
}
export const personalization = [
  {
    label: (
      <>
        <div className="icon">
          <BiNews />
        </div>

        <span className="text">Notícia</span>
      </>
    ),
    children: [
      {
        label: (
          <>
            <span className="text">Criar</span>
          </>
        ),
        path: '/news'
      }
    ]
  },
  {
    label: (
      <>
        <div className="icon">
          <BiCategoryAlt />
        </div>

        <span className="text">Categorias</span>
      </>
    ),
    children: [
      {
        label: (
          <>
            <span className="text">Criar</span>
          </>
        ),
        path: '/create-category'
      }
    ]
  }
]
