import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './Nav.css'

const Nav = (props) => {
  const { location } = props

  const handleDisplay = (location) => {
    switch (location) {
      case '/project/new':
        return (
          <>
            <h3 className='title'>Ajout d&apos;un nouveau projet</h3>
            <hr className='hr-thin' />
          </>
        )
      default:
        return (
          <nav>
            <NavLink exact to='/'>
              Accueil
            </NavLink>
            <span className='sep'> | </span>
            <NavLink to='/project'>Projets</NavLink>
          </nav>
        )
    }
  }

  return <div className='cont-nav'>{handleDisplay(location)}</div>
}

Nav.propTypes = {
  location: PropTypes.string.isRequired
}

export default Nav
