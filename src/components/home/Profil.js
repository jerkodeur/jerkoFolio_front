import React from 'react'
import Proptypes from 'prop-types';

import Connexion from '../admin/Connexion'

import './Profil.css'

import ProfilPhoto from '../../images/me.jpeg'

const Profil = ({ displayForm }) => {

  const Identity = () => (
    <>
      <label>Identité </label>
      <div className='div-infos'>
        <div className='flex-ident'>
          <h4 className='cat'>Nom:</h4>
          <p className='infos'>Potié</p>
        </div>
        <div className='flex-ident'>
          <h4 className='cat'>Prénom:</h4>
          <p className='infos'>Jérôme</p>
        </div>
        <div className='flex-ident'>
          <h4 className='cat'>Alias:</h4>
          <p className='infos'>Jerkoder</p>
        </div>
      </div>
    </>
  )

  return (
    <div className='flex-profil'>
      <img src={ProfilPhoto} alt='' className='profil-photo' />
      {displayForm ? <Connexion /> : <Identity />}
    </div>
  )
}

Profil.prototype = {
  displayForm: Proptypes.bool.isRequired
}

export default Profil