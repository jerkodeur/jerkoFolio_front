import React, { useState } from 'react';
import axios from 'axios'

import './Connexion.css'

const Connexion = () => {

  const [datas, SetDatas] = useState({
    pseudo: '',
    password: ''
  })

  const handleChange = (e) => {
    SetDatas({ ...datas, [e.target.id]: e.target.value })
  }

  const handleClick = () => {
    datas.pseudo !== '' && datas.password !== '' && axios.post('/admins', datas)
      .then(console.log('You are connected'))
      .catch(console.log('an error occured'))
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
            <input type='text' onChange={handleChange} id='pseudo' value={datas.pseudo} placeholder='Pseudo' />
          </div>
          <div>
            <input type='password' onChange={handleChange} id='password' value={datas.password} placeholder='Mot de passe' />
          </div>
          <button onClick={handleClick}>Valider</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Connexion