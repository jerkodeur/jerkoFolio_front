import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import classNames from 'classnames'

import Header from '../commons/Header'

import './NewProject.css'
import 'react-datepicker/dist/react-datepicker.css'

import True from '../../images/true.png'
import False from '../../images/false.png'

// Add a class where a techno is selected
const technoClassName = (selectedTechnos, id) =>
  classNames({
    selected: selectedTechnos.includes(id)
  })

const defineIfOk = (bool) => (
  <span>
    <img src={bool ? True : False} alt='' />
  </span>
)

const errorMessages = {
  getTechnos: 'Erreur pendant la récupération des technos',
  postProject: 'Erreur pendant la sauvegarde du projet'
}

const NewProject = ({
  location,
  submitForm,
  handleChange,
  formData,
  setFormData,
  formErrors,
  ajaxError,
  listTechnos,
  selectedTechnos,
  handleTechnos,
  handleClick
}) => (
  <>
    <Header location={location.pathname} />
    <div className='cont-new-project'>
      <form onSubmit={submitForm}>
        {ajaxError.action && (
          <div className='ajax-error'>
            <h3>{errorMessages[ajaxError.action]}</h3>
            <p>
              Code: {ajaxError.code} - Message: {ajaxError.message}
            </p>
          </div>
        )}
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
            <span className='required'>*</span> Nom du screenshot (+ extension)
            {defineIfOk(formErrors.image === 'yes')}
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
                className={technoClassName(selectedTechnos, techno.id)}
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

NewProject.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  submitForm: PropTypes.func,
  handleChange: PropTypes.func,
  formData: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url_github: PropTypes.bool,
    url_test: PropTypes.bool
  }),
  setFormData: PropTypes.func,
  formErrors: PropTypes.shape({
    image: PropTypes.string,
    url_github: PropTypes.bool,
    url_test: PropTypes.bool
  }),
  ajaxError: PropTypes.shape({
    action: PropTypes.string,
    code: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    message: PropTypes.string
  }),
  listTechnos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image_name: PropTypes.string
    })
  ),
  selectedTechnos: PropTypes.arrayOf(PropTypes.number),
  handleTechnos: PropTypes.func,
  handleClick: PropTypes.func
}

export default NewProject
