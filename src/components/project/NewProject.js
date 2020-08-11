import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import DatePicker from 'react-datepicker'
import { Redirect } from 'react-router-dom'

import Header from '../commons/Header'

import './NewProject.css'
import 'react-datepicker/dist/react-datepicker.css'

import True from '../../images/true.png'
import False from '../../images/false.png'

const url = process.env.REACT_APP_API_URL

const NewProject = (props) => {
  //* STATE

  // Handle the form datas
  const [formData, setFormData] = useState({
    title: null,
    description: null,
    image: null,
    url_github: null,
    url_test: null,
    date: new Date()
  })

  // handle techno list
  const [selectedTechnos] = useState([])
  const [listTechnos, setListTechnos] = useState()

  // handle Errors
  const [errors, setErrors] = useState({
    postProject: {
      code: null,
      message: null,
      backReturn: null
    },
    getTehnos: {
      code: null,
      message: null,
      backReturn: null
    },
    formData: {
      image: null,
      url_github: false,
      url_test: false
    }
  })

  // others
  const [errorAlarm, setErrorAlarm] = useState(false)
  const [refresh, setRefresh] = useState(null)

  // Fetching technos on the first loading of the page
  useEffect(() => {
    fetchTechnos()
    return () => fetchTechnos()
  }, [])

  // fetch the list of the technologies
  const fetchTechnos = () => {
    Axios.get(`${url}/technos`)
      .then((res) => setListTechnos(res.data))
      .catch((err) => {
        const errStatus = err.response.status
        const errMessage = err.response.data
        setErrors({
          ...errors,
          getTehnos: { code: errStatus, message: errMessage, backReturn: err }
        })
        setErrorAlarm('getTechnos')
        console.log(errors.getTehnos)
      })
  }

  // Add form data to the state on change
  const handleChange = (e) => {
    const value = e.target.value
    const id = e.target.id
    setFormData({ ...formData, [id]: value })
    // Verify if image exist
    if (id === 'image') {
      try {
        require(`../../images/projets/${value}`)
        setErrors({ ...errors, formData: { ...formData, image: 'yes' } })
      } catch (err) {
        setErrors({ ...errors, formData: { ...formData, image: 'no' } })
      }
    }
  }
  // Manage the list of selected techno
  const handleTechnos = (e) => {
    const tempId = e.target.id
    const pos = selectedTechnos.indexOf(tempId)
    if (pos !== -1) {
      selectedTechnos.splice(pos, 1)
    } else {
      selectedTechnos.push(tempId)
    }
    setRefresh(!refresh)
  }
  // Add a class where a techno is selected
  const handleClass = (id) => {
    const pos = selectedTechnos.includes(id.toString())
    if (pos) {
      return 'selected'
    } else {
      return ''
    }
  }
  const defineIfOk = (bool) => {
    return bool ? (
      <span>
        <img src={True} alt='' />
      </span>
    ) : (
      <span>
        <img src={False} alt='' />
      </span>
    )
  }
  // handle page refresh
  useEffect(() => {}, [refresh])

  // remove the default behavior of the form
  const submitForm = (e) => {
    e.preventDefault(e)
  }

  const handleClick = (e) => {
    const datasToBack = {}
    datasToBack.project = formData
    datasToBack.techno = selectedTechnos
    Axios.post(`${url}/projects`, datasToBack)
      .then((res) => res.status === 201 && <Redirect to='/project' />)
      .catch((err) => {
        const errStatus = err.response.status
        const errMessage = err.response.data
        setErrors({
          ...errors,
          postProject: { code: errStatus, message: errMessage, backReturn: err }
        })
        setErrorAlarm('postProject')
        console.log(errors.postProject)
      })
  }

  return (
    <>
      <Header location={props.location.pathname} />
      <div className='cont-new-project'>
        <form onSubmit={submitForm}>
          <div className='flex-input'>
            <label htmlFor='title'>
              <span className='required'>* </span>Titre
            </label>
            <input
              type='text'
              id='title'
              name='title'
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex-input calendar'>
            <span className='required'>
              * <label>Mois du projet</label>
            </span>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date: date })}
              maxDate={new Date()}
              dateFormat='MM/yyyy'
              showMonthYearPicker
              popperClassName='some-custom-class'
              popperPlacement='bottom-center'
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '5px, 10px'
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'viewport'
                }
              }}
            />
          </div>
          <div className='flex-input'>
            <label htmlFor='description'>
              <span className='required'>*</span> Description
            </label>
            <textarea
              id='description'
              name='description'
              rows='5'
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex-input'>
            <label htmlFor='image'>
              <span className='required'>*</span> Nom du screenshot (+
              extension)
              {errors.formData.image !== null && errors.formData.image === 'yes'
                ? defineIfOk(true)
                : defineIfOk(false)}
            </label>

            <input
              type='text'
              id='image'
              name='image'
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex-input'>
            <label htmlFor='url_github'>Lien vers le dépôt Github</label>
            <input
              type='url'
              id='url_github'
              name='url_github'
              onChange={handleChange}
            />
          </div>
          <div className='flex-input'>
            <label htmlFor='url_test'>
              Lien vers le site de l&apos;application
            </label>
            <input
              type='url'
              id='url_test'
              name='url_test'
              onChange={handleChange}
            />
          </div>
          <ul>
            {listTechnos &&
              listTechnos.map((techno, id) => (
                <li
                  key={id}
                  id={techno.id}
                  onClick={handleTechnos}
                  className={handleClass(techno.id)}
                >
                  {techno.name}
                </li>
              ))}
          </ul>
          <input
            type='button'
            className='button'
            onClick={handleClick}
            value='AJOUTER'
          />
        </form>
      </div>
    </>
  )
}

NewProject.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
}

export default NewProject
