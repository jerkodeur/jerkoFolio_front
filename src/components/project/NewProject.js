import React from 'react'

import Header from '../commons/Header'

import './NewProject.css'

const NewProject = (props) => {
  return (
    <div>
      <Header location={props.location.pathname} />
      Here is the NewProject page
    </div>
  )
}

export default NewProject