import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'
import React from 'react'

import Nav from './Nav'
import Title from './Title'

import './Header.css'

import BackArrow from '../../images/back_arrow.png'
import Github from '../../images/github.png'
import Mail from '../../images/email.png'
import Linkedin from '../../images/linkedin.png'

const Header = (props) => {
  const { location } = props

  const Contact = () => (
    <div>
      <a href='https://github.com/jerkodeur' title='Go to my linkedin profile' target='_blank' rel="noopener noreferrer">
        <img src={Linkedin} alt='' />
      </a>
      <a href='https://github.com/jerkodeur' title='Go to my github profile' target='_blank' rel="noopener noreferrer">
      <img src={Github} alt='' />
      </a>
      <a href='maito:jerome.potie@gmail.com' title='Send me an Email'>
        <img src={Mail} alt='' />
      </a>
    </div>
  )


  const defineCustomElement = (location) => {
    switch (location) {
      case '/project':
        return <Link to='/project/new'><p className='more-button'>+</p></Link>
      case '/project/new':
        return <p className="title-link"><Link to='/project'><img src={BackArrow} alt='retour'/></Link></p>
      default:
        return <p className='contact'><Contact /></p>
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