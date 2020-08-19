import React from 'react'
import Proptypes from 'prop-types';

import Connexion from '../admin/Connexion'

import './Profil.css'

import ProfilPhoto from '../../images/me.jpeg'

const Profil = ({ displayForm, defineIfConnect, connected }) => {

  return (
    <div>
      <img src={ProfilPhoto} alt='' className='profil-photo' />
      {displayForm && !connected && <Connexion defineIfConnect={defineIfConnect} />}
    </div>
  )
}

Profil.prototype = {
  displayForm: Proptypes.bool.isRequired,
  defineIfConnect: Proptypes.func.isRequired,
  connected: Proptypes.bool.isRequired
}

export default Profil