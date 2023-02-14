import * as S from './styles'

export default function Form({ children, ...props }) {
  return <S.Form {...props}>{children}</S.Form>
}
