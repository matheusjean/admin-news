import React from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'

import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Category from '../../pages/Category'
import CreateAndEditCategory from '../../pages/Category/CreateAndEdit'
import News from '../../pages/News'
import CreateAndEditNews from '../../pages/News/CreateAndEdit'

const Default = (props: RouteProps) => {
  return (
    <DefaultLayout>
      <Route {...props} />
    </DefaultLayout>
  )
}
export default function Routes() {
  return (
    <Switch>
      <Default exact path="/" />
      <Default exact path="/news" component={News} />
      <Default exact path="/create-news" component={CreateAndEditNews} />
      <Default exact path="/edit-news/:newsId" component={CreateAndEditNews} />

      <Default exact path="/category" component={Category} />
      <Default exact path="/create-category" component={CreateAndEditCategory} />
      <Default exact path="/edit-category/:categoryId" component={CreateAndEditCategory} />
    </Switch>
  )
}
