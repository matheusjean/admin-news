import React from 'react'
import { Switch, Route, RouteProps, Redirect } from 'react-router-dom'

import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useAuth } from '../../context/AuthContext'
import Category from '../../pages/Category'
import CreateAndEditCategory from '../../pages/Category/CreateAndEdit'
import Login from '../../pages/Login'
import News from '../../pages/News'
import CreateAndEditNews from '../../pages/News/CreateAndEdit'
import AuthLayout from '../Layouts/AuthLayout'

const AuthRequired = (props: RouteProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Redirect to="/login" />
  }

  return (
    <DefaultLayout>
      <Route {...props} />
    </DefaultLayout>
  )
}

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" exact>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </Route>

      <AuthRequired exact path="/" />
      <AuthRequired exact path="/news" component={News} />
      <AuthRequired exact path="/create-news" component={CreateAndEditNews} />
      <AuthRequired exact path="/edit-news/:newsId" component={CreateAndEditNews} />

      <AuthRequired exact path="/category" component={Category} />
      <AuthRequired exact path="/create-category" component={CreateAndEditCategory} />
      <AuthRequired exact path="/edit-category/:categoryId" component={CreateAndEditCategory} />
    </Switch>
  )
}
