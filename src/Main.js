import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Feed from './Feed'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Feed}/>
      <Route exact path='/bill' component={Bill}/>
    </Switch>
  </main>
)

export default Main

