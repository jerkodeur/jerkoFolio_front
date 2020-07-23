import React from 'react'

import Title from './Title'
import Nav from './Nav'
import './Header.css'

const Header = () => {
  return (
    <div className='cont-header'>
      <div>
        <Title />
      </div>
      <hr />
      <Nav />
    </div>
  )
}

export default Header