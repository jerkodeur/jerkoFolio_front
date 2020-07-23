import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Home from '../home/Home'
import Project from '../project/Project'

const Routes = () => {
  return(
  <Switch>
      <Route path='/' component={Home} />
      <Route path="/project" component={Project} />
  </Switch>
  )
}

export default Routes
