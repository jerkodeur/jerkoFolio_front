import React, { useState, useEffect } from 'react'

import Header from '../commons/Header'

import './NewProject.css'
import Axios from 'axios'

const url = process.env.REACT_APP_API_URL

const NewProject = (props) => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    url_github: '',
    url_test: '',
    date: ''
  })

  const [selectedTechnos, setSelectedTechnos] = useState([])
  const [listTechnos, setListTechnos] = useState()
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetchTechnos()
    return () => fetchTechnos()
  },[])

  const fetchTechnos = () => {
    Axios.get(`${url}/technos`)
      .then(res => console.log(res.data) || setListTechnos(res.data))
  }

  const handleChange = (e) => {
    const value = e.target.value
    const id = e.target.id
    setFormData({...formData, [id]: value})
  }

  const handleTechnos = (e) => {
    const tempId = e.target.id
    const pos = selectedTechnos.indexOf(tempId)
    if ( pos !== -1) {
      selectedTechnos.splice(pos, 1)
    } else {
      selectedTechnos.push(tempId)
    }
    setRefresh(!refresh)
  }

  const handleClass = (id) => {
    const pos = selectedTechnos.includes(id.toString())
    if (pos) {
      return 'selected'
    } else {
      return ''
    }
  }

  useEffect(() => {
  }, [refresh])

  const submitForm = (e) => {
    e.preventDefault(e)
  }

  const handleClick = (e) => {
    console.log('OK')
  }

  return (
    <>
      <Header location={props.location.pathname} />
      <div className='cont-new-project'>
        <form onSubmit={submitForm} >
          <div className='flex-input'>
          <label htmlFor='title'>Titre <span className='required'>*</span></label>
          <input type='text' id='title' name='title' onChange={handleChange} required />
          </div>
          <div className='flex-input'>
            <label htmlFor='date'>Date / Période <span className='required'>*</span></label>
            <input type='text' id='date' name='date' onChange={handleChange} required/>
          </div>
          <div className='flex-input'>
            <label htmlFor='description'>Description <span className='required'>*</span></label>
            <textarea id='description' name='description' rows='5' onChange={handleChange} required />
          </div>
          <div className='flex-input'>
            <label htmlFor='image'>Screenshot du projet <span className='required'>*</span></label>
            <input type='text' id='image' name='image' onChange={handleChange} required />
          </div>
          <div className='flex-input'>
          <label htmlFor='url_github'>Lien vers le dépôt Github</label>
            <input type='text' id='url_github' name='giturl_githubhub' onChange={handleChange} />
          </div>
          <div className='flex-input'>
          <label htmlFor='url_test'>Lien vers le site de l'application</label>
            <input type='text' id='url_test' name='url_test' onChange={handleChange} />
          </div>
          <ul>
            {
              listTechnos && listTechnos.map((techno, id) => <li key={id} id={techno.id} onClick={handleTechnos} className={handleClass(techno.id)}>{techno.name}</li>)
            }
          </ul>
          <button onClick={handleClick} >AJOUTER</button>
        </form>
      </div>
    </>
  )
}

export default NewProject