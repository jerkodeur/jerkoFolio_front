import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

import NewProject from './NewProject'
import imageExists from '../../helpers/imageExists'

const url = process.env.REACT_APP_API_URL

const NewProjectContainer = ({ location }) => {
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
  const [selectedTechnos, setSelectedTechnos] = useState([])
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
  const handleChange = async (e) => {
    const value = e.target.value
    const id = e.target.id
    setFormData({ ...formData, [id]: value })
    // Verify if image exist
    if (id === 'image') {
      const exists = await imageExists('projets', value)
      const image = exists ? 'yes' : 'no'
      setErrors({ ...errors, formData: { ...formData, image } })
    }
  }
  // Manage the list of selected techno
  const handleTechnos = (e) => {
    const tempId = Number(e.target.id)
    setSelectedTechnos((prevSelectedTechnos) =>
      prevSelectedTechnos.includes(tempId)
        ? prevSelectedTechnos.filter((technoId) => technoId !== tempId)
        : [...prevSelectedTechnos, tempId]
    )
  }

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
    <NewProject
      location={location}
      submitForm={submitForm}
      handleChange={handleChange}
      formData={formData}
      setFormData={setFormData}
      errors={errors}
      listTechnos={listTechnos}
      selectedTechnos={selectedTechnos}
      handleTechnos={handleTechnos}
      handleClick={handleClick}
    />
  )
}

export default NewProjectContainer
