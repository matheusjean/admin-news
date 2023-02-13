import React from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'

import DefaultLayout from '../../components/Layouts/DefaultLayout'
import News from '../../pages/News'

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
    </Switch>
  )
}
