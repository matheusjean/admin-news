import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }

  & .react-datepicker-wrapper {
    flex-grow: 1;

    input {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      border: solid 1px var(--default-dark-gray);
      padding: 10px 15px;
    }
  }
`
