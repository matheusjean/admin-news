import styled, { css } from "styled-components";

export const Container = styled.div``;

export const FormButtons = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button:not(:last-child) {
    margin-right: 20px;
  }
`;
