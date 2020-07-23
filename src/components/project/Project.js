import React from 'react'

import Header from '../commons/Header'

import './Project.css'

const Project = (props) => {
  return (
    <div>
      <Header location={props.location.pathname} />
      Here is the project page
    </div>
  )
}

export default Project