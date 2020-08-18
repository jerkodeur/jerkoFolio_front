import React, { useState } from 'react';
import axios from 'axios'
import jwt from 'jsonwebtoken'
import Proptypes from 'prop-types'

import './Connexion.css'

const Connexion = ({ defineIfConnect }) => {

  const [datas, SetDatas] = useState({
    pseudo: '',
    password: ''
  })

  const handleChange = (e) => {
    SetDatas({ ...datas, [e.target.id]: e.target.value })
  }

  const handleClick = () => {
    datas.pseudo !== '' && datas.password !== '' && axios.post('/admins', datas)
      .then(res => {
        const token = res.headers['x-access-token']
        localStorage.clear()
        localStorage.setItem('token', token)
        localStorage.setItem('id', jwt.decode(token).id)
        defineIfConnect(true)
      })
      .catch(err => console.log(err))
  }

  const submitForm = (e) => {
    e.preventDefault()
  }

  return (
    <div className='cont-connexion'>
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>Connexion</legend>
          <div>
            <input
              type='text'
              onChange={handleChange}
              id='pseudo'
              value={datas.pseudo}
              placeholder='Pseudo'
            />
          </div>
          <div>
            <input
              type='password'
              onChange={handleChange}
              id='password'
              value={datas.password}
              placeholder='Mot de passe'
              autoComplete
            />
          </div>
          <button onClick={handleClick}>Valider</button>
        </fieldset>
      </form>
    </div>
  )
}

Connexion.prototypes = {
  defineIfConnect: Proptypes.func.isRequired
}

export default Connexion