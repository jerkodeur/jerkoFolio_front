import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'

import ProjectForm from './ProjectForm'
import imageExists from '../../helpers/imageExists'
import formatAjaxError from '../../helpers/formatAjaxError'

const url = process.env.REACT_APP_API_URL

const ProjectFormContainer = ({ location, history, match }) => {
  // Get projectId for edit mode
  const {
    params: { projectId }
  } = match

  //* STATE

  // Handle the form datas
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    url_github: '',
    url_test: '',
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
    if (projectId) fetchProject(projectId)
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

  // fetch the list of the technologies
  const fetchProject = (projectId) => {
    Axios.get(`${url}/projects/${projectId}`)
      .then((res) => {
        const { mainDatas, technos } = res.data
        const technoIds = technos.map(({ id }) => id)
        setSelectedTechnos(technoIds)

        const { id, date, ...rest } = mainDatas
        const projectData = {
          ...rest,
          date: new Date(date)
        }
        setFormData(projectData)
        checkImage(projectData.image)
      })
      .catch((err) => {
        const errorObject = formatAjaxError(err, 'getProject')
        setAjaxError(errorObject)
      })
  }

  const checkImage = async (value) => {
    const exists = await imageExists('projets', value)
    const image = exists ? 'yes' : 'no'
    setFormErrors({ ...formErrors, image })
  }

  // Add form data to the state on change
  const handleChange = (e) => {
    const value = e.target.value
    const id = e.target.id
    setFormData({ ...formData, [id]: value })
    // Verify if image exist
    if (id === 'image') {
      checkImage(value)
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
    const datasToBack = {}
    datasToBack.project = formData
    datasToBack.techno = selectedTechnos
    if (!projectId) {
      createProject(datasToBack)
    } else {
      updateProject(datasToBack, projectId)
    }
  }

  const createProject = (datasToBack) => {
    Axios.post(`${url}/projects`, datasToBack)
      .then(() => history.push('/project'))
      .catch((err) => {
        const errorObject = formatAjaxError(err, 'postProject')
        setAjaxError(errorObject)
      })
  }

  const updateProject = (datasToBack, id) => {
    Axios.put(`${url}/projects/${id}`, datasToBack)
      .then(() => history.push('/project'))
      .catch((err) => {
        const errorObject = formatAjaxError(err, 'putProject')
        setAjaxError(errorObject)
      })
  }

  const buttonLabel = projectId ? 'MODIFIER' : 'AJOUTER'
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
      buttonLabel={buttonLabel}
    />
  )
}

ProjectFormContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string
    })
  }).isRequired,
}

export default ProjectFormContainer
