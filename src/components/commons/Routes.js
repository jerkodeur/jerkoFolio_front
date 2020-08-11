import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../home/Home'
import Project from '../project/Project'
import ProjectFormContainer from '../project/ProjectFormContainer'

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/project' component={Project} />
      <Route path='/project/new' component={ProjectFormContainer} />
    </Switch>
  )
}

export default Routes
