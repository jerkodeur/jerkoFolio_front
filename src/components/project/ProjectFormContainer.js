import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

import ProjectForm from './ProjectForm'
import imageExists from '../../helpers/imageExists'
import formatAjaxError from '../../helpers/formatAjaxError'

const url = process.env.REACT_APP_API_URL

const ProjectFormContainer = ({ location }) => {
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
  const [ajaxError, setAjaxError] = useState({
    action: '',
    code: null,
    message: null
  })
  const [formErrors, setFormErrors] = useState({
    image: null,
    url_github: false,
    url_test: false
  })

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
        const errorObject = formatAjaxError(err, 'getTechnos')
        setAjaxError(errorObject)
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
      setFormErrors({ ...formErrors, image })
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
        const errorObject = formatAjaxError(err, 'postProject')
        setAjaxError(errorObject)
      })
  }
  return (
    <ProjectForm
      location={location}
      submitForm={submitForm}
      handleChange={handleChange}
      formData={formData}
      setFormData={setFormData}
      formErrors={formErrors}
      ajaxError={ajaxError}
      listTechnos={listTechnos}
      selectedTechnos={selectedTechnos}
      handleTechnos={handleTechnos}
      handleClick={handleClick}
    />
  )
}

ProjectFormContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
}

export default ProjectFormContainer
