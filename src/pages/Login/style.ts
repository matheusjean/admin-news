import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #101010;
  @media (max-width: 768px) {
    background-color: var(--white);
    flex-direction: column;
  }
`

export const LogoContainer = styled.span`
  background: #101010;
  flex: 1 0 50%;
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;

    @media (max-width: 768px) {
      background: black;
      flex: 1;
      margin: 20vw 0;
    }
  }
`

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 50%;
  padding: 0 20px;
  background: #101010;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`

export const LoginBlock = styled.div`
  background: black;
  width: 100%;
  padding: 3rem;
  border-radius: 12px;
  max-width: 450px;
  box-shadow: 0px 0px 2px 10px #00000026;
`

export const LoginTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2rem;
    font-weight: 500;
  }
`

export const LoginDescription = styled.p`
  font-size: 1.8rem;
  margin-bottom: 40px;
  line-height: 28px;
  font-weight: 600;
  color: var(--white);

  strong {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 20px;

    strong {
      font-weight: 400;
    }
  }
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const LoginLabel = styled.label`
  width: 100%;
  font-weight: lighter;
  font-size: 1.5rem;
  color: var(--white);
  &:not(:first-child) {
    margin-top: 32px;
  }
`

export const LoginInput = styled.input`
  font-family: 'Nunito Sans', 'Roboto', sans-serif;
  background: none;
  color: var(--white);

  &[type='email'],
  &[type='password'] {
    width: 100%;
    margin-top: 8px;
    font-size: 2rem;
    border: none;
    border-bottom: 2px solid var(--white);
    padding: 16px 4px;
    outline: none;
  }

  &[type='submit'] {
    color: var(--white);
    border: none;
    line-height: 25px;
    width: 147px;
    font-size: 1.8rem;
    font-weight: 800;
    margin-top: 32px;
    cursor: pointer;
    border-radius: 8px;
    padding: 16px 24px;
    background: #e4672e;

    text-transform: uppercase;
    color: var(--black);
  }
`
