import styled, { css } from 'styled-components'

interface containerProps {
  isChecked: boolean
}
export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  label {
    margin-bottom: 0;
  }
`

export const Toggle = styled.div<containerProps>`
  ${({ isChecked = false }) => css`
    > div {
      border: ${isChecked ? '1px solid #E4672E' : '1px solid white'};
    }
  `}
`
