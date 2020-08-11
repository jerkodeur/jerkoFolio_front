import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import classNames from 'classnames'

import Header from '../commons/Header'

import './NewProject.css'
import 'react-datepicker/dist/react-datepicker.css'

// Add a class where a techno is selected
const technoClassName = (selectedTechnos, id) =>
  classNames({
    selected: selectedTechnos.includes(id.toString())
  })

const NewProject = ({
  location,
  submitForm,
  handleChange,
  formData,
  setFormData,
  errors,
  defineIfOk,
  listTechnos,
  selectedTechnos,
  handleTechnos,
  handleClick
}) => (
  <>
    <Header location={location.pathname} />
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
            <span className='required'>*</span> Nom du screenshot (+ extension)
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
  }).isRequired
}

export default NewProject
