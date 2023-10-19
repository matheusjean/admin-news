import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import * as Style from './style'

export default function Login() {
  const { login, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Função signIn sendo chamada');
    return login({ email, password })
  }

  if (user) {
    return <Redirect to="/news" />
  }

  return (
    <Style.Container>
      <Style.LoginContainer>
        <Style.LoginBlock>
          <Style.LoginTitle>Que bom te ver aqui!</Style.LoginTitle>
          <Style.LoginDescription>
            Bem-vindo à plataforma administrativa da
            ILHA DAS LENDAS
          </Style.LoginDescription>
          <Style.LoginForm onSubmit={signIn}>
            <Style.LoginLabel>
              Login
              <Style.LoginInput
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Style.LoginLabel>
            <Style.LoginLabel>
              Senha
              <Style.LoginInput
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Style.LoginLabel>
            <Style.LoginInput type="submit" value="Entrar" />
          </Style.LoginForm>
        </Style.LoginBlock>
      </Style.LoginContainer>
    </Style.Container>
  )
}
