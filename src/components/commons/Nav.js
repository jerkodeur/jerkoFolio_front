import React from 'react'
import { NavLink } from 'react-router-dom'

import './Nav.css'

const Nav = () => {
  return (
    <div className='cont-nav'>
      <nav>
        <NavLink exact to='/'>Accueil</NavLink>
        <span className='sep'> § </span>
        <NavLink to='/project'>Projets</NavLink>
      </nav>
    </div>
  )
}

export default Nav
