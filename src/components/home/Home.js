import React from 'react'

import Header from '../commons/Header'

import './Home.css'

const Home = (props) => {
  return (
    <div>
      <Header location={props.location.pathname} />
      Here is the Home page
    </div>
  )
}

export default Home