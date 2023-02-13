import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

import DefaultLayout from '../../components/Layouts/DefaultLayout'
export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<DefaultLayout />} />
    </Switch>
  )
}
