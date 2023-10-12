import styled, { css } from 'styled-components'

export const LabelInput = styled.label`
  ${({ theme }) => css`
    margin-bottom: 10px;
    font-size: var(--font-small);
    color: ${theme.colors.white};
    font-weight: 700;
  `}
`
