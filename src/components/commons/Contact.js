import React from 'react'

import './Contact.css'

import Cv from '../../images/icones/cv.png'
import Github from '../../images/icones/github.png'
import Linkedin from '../../images/icones/linkedin.png'
import Mail from '../../images/icones/email.png'
import myCv from '../../images/Potié Jérôme - Développeur Web.pdf'

const Contact = () => (
  <div className="cont-contact">
    <a href={ myCv } target='_blank' title='Télécharger mon cv' rel="noopener noreferrer">
      <img src={ Cv } alt='' />
    </a>
    <a href='https://www.linkedin.com/in/j%C3%A9r%C3%B4me-poti%C3%A9/' title='Voir mon profil Linkedin' target='_blank' rel="noopener noreferrer">
      <img src={Linkedin} alt='' />
    </a>
    <a href='https://github.com/jerkodeur' title='Voir mon profil Github' target='_blank' rel="noopener noreferrer">
      <img src={Github} alt='' />
    </a>
    <a href='maito:jerome.potie@gmail.com' title='Contactez-moi!'>
      <img src={Mail} alt='' />
    </a>
  </div>
)

export default Contact