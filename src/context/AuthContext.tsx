import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import Swal from 'sweetalert2'

import ILoginData from '../models/loginData'
import { login as signInService } from '../services/login'

type AuthContext = {
  user: string | undefined

  login: (data: ILoginData) => Promise<void>

  logout: () => void
}

type ProviderProps = {
  children: ReactNode
}

export const Context = createContext({} as AuthContext)

export default function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<string | undefined>(() => {
    const token = localStorage.getItem('admin-api-token')

    return token
  })

  const history = useHistory()

  const login = useCallback(
    async (data: ILoginData) => {
      try {
        const user = await signInService(data)

        setUser(user)

        localStorage.setItem('admin-api-token', user.token)

        history.push('/news')
      } catch (error) {
        Swal.fire({
          title: 'Erro ao efetuar login.',

          text: 'O email ou a senha estão incorretos ou não existem.',

          icon: 'error',

          confirmButtonColor: '#1d2680'
        })
      }
    },

    [history]
  )

  const logout = useCallback(() => {
    setUser(undefined)

    localStorage.removeItem('admin-api-token')

    localStorage.removeItem('admin-user')

    localStorage.removeItem('admin-api-token')

    localStorage.removeItem('admin-token')

    history.push('/login')
  }, [history])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAuth() {
  const { user, login, logout } = useContext(Context)

  return { user, login, logout }
}
