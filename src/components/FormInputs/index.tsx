import { FormGroupInput } from './styles'

export default function FormInputs({ children, ...props }) {
  return <FormGroupInput {...props}>{children}</FormGroupInput>
}
