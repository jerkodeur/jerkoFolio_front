import React from 'react'
import { NavLink } from 'react-router-dom'

import './Nav.css'

const Nav = (props) => {

  const { location } = props

  const handleDisplay = (location) => {
    switch (location) {
      case '/project/new':
        return (
          <>
            <h3 className='title'>Ajout d'un nouveau projet</h3>
            <hr className='hr-thin' />
            </>
        )
      default:
        return (
          <nav>
            <NavLink exact to='/'>Accueil</NavLink>
            <span className='sep'> § </span>
            <NavLink to='/project'>Projets</NavLink>
          </nav>
        )
    }
  }


  return (
    <div className='cont-nav'>
      {handleDisplay(location)}
    </div>
  )
}

export default Nav
