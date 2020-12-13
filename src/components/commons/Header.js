import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'

import Contact from './Contact'
import Nav from './Nav'
import Title from './Title'

import './Header.css'

import BackArrow from '../../images/icones/back_arrow.png'

const Header = (props) => {
  const token = localStorage.getItem('token')

  const { location } = props

  const [windowSize, setWindowSize] = useState()

  // Define the width of the screen
  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize(window.innerWidth,)
    }
    window.addEventListener('resize', updateSize);
    updateSize()
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  const defineCustomElement = (location) => {
    switch (location) {
      case token && '/project':
        return <Link to='/project/new'><p className='more-button'>+</p></Link>
      case '/project/new':
        return <p className="title-link"><Link to='/project'><img src={BackArrow} alt='retour'/></Link></p>
      default:
        return windowSize > 535 ? <div className='contact'><Contact /></div> : ''
    }
  }
  return (
    <div className='cont-header'>
      <div className='flex-header'>
        <div>
          <Title />
        </div>
        { defineCustomElement(location) }
      </div>
      <hr />
      <Nav location={location} />
    </div>
  )
}

Header.propTypes = {
  location: Proptypes.string.isRequired
}

export default Header