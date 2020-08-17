import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'
import React from 'react'

import Nav from './Nav'
import Title from './Title'
import Contact from './Contact'

import './Header.css'

import BackArrow from '../../images/back_arrow.png'

const Header = (props) => {
  const { location, windowSize } = props

  const defineCustomElement = (location) => {
    switch (location) {
      case '/project':
        return <Link to='/project/new'><p className='more-button'>+</p></Link>
      case '/project/new':
        return <p className="title-link"><Link to='/project'><img src={BackArrow} alt='retour'/></Link></p>
      default:
        return windowSize > 450 ? <p className='contact'><Contact /></p> : ''
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
  location: Proptypes.string.isRequired,
  windowSize: Proptypes.number.isRequired
}

export default Header