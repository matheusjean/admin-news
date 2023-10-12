import Select from 'react-select'

import Label from '../Label'
import { Dropdown } from './styles'

type inputSelectType = {
  title?: string
  id?: string
  label?: string
  value?: string
  style?: { color: string }
}
interface inputSelectProps {
  options?: inputSelectType[]
  value?: any
  onChange?: any
  isMulti?: boolean
  closeMenuOnSelect?: boolean
  title: string
}

export default function InputSelect({
  options,
  value,
  onChange,
  isMulti = true,
  closeMenuOnSelect,
  title
}: inputSelectProps) {
  const styles = {
    option: (provided) => ({
      ...provided,
      color: 'white',
      backgroundColor: '#1c1c1c'
    }),
    singleValue: () => ({
      color: '#fff',
      background: '#a5a2a2'
    })
  }

  return (
    <Dropdown>
      <span className="entire-row">
        <Label htmlFor="plan">{title}</Label>
        <Select
          isMulti={isMulti}
          classNamePrefix="react-select"
          className="input-style"
          closeMenuOnSelect={closeMenuOnSelect}
          options={options}
          value={value}
          styles={styles}
          onChange={onChange}
        ></Select>
      </span>
    </Dropdown>
  )
}
