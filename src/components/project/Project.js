import React, { useLayoutEffect, useEffect, useState } from 'react'
import Axios from 'axios'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

import 'moment/locale/fr'

import DisplayTechnos from './DisplayTechnos';
import Header from '../commons/Header'

import './Project.css'

const url = process.env.REACT_APP_API_URL

const Project = (props) => {

  const [projects, setProjects] = useState()
  const [windowSize, setWindowSize] = useState()

  useEffect(() => {
    Axios.get(`${url}/projects`)
      .then(res => res.status === 200 && setProjects(res.data))
      .catch(err => console.log(err))
  }, [])

  // Define the width of the screen
  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize(window.innerWidth,)
    }
    window.addEventListener('resize', updateSize);
    updateSize()
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  return (
    <div>
      <Header location={props.location.pathname} />
      <div className='cont-display-projects'>
        {
          projects && projects.map((project, id) => {
            const { title, description, date, url_github, url_test, image } = project.mainDatas
            const technos = project.technos
            let tempDate = moment(date).format('MMMM YYYY')
            tempDate = tempDate[0].toUpperCase() + tempDate.slice(1)
            const tempImage = require(`../../images/projets/${image}`)
            const side = id % 2 === 0 ? 'left' : 'right'
            return (
              <div className='flex-gen-project' key={id}>
                {side === 'right' && windowSize > 1150 && <div className='description'><ReactMarkdown source={description} /></div>}
                  {side === 'right' && windowSize > 1150 && <DisplayTechnos listTechnos={technos} size={windowSize} />}
                <div className={side}>
                  <div className='title'>
                    {side === 'left' && <h1>{title}</h1>}
                    <span className={side === 'left' ? 'date-right' : 'date-left'}>{tempDate}</span>
                    {side === 'right' && <h1>{title}</h1>}
                  </div>
                  <div className={side === 'left' ? 'cont-screenshot-Tleft' : 'cont-screenshot-Tright'}>
                    {side === 'right' && windowSize < 1150 && <DisplayTechnos listTechnos={technos} size={windowSize} side='right' />}
                    <img src={tempImage} alt='Screenshot du projet' className='project-img' />
                    {side === 'left' && windowSize < 1150 && <DisplayTechnos listTechnos={technos} size={windowSize} side='left' />}
                  </div>
                </div>
                {side === 'left' && windowSize > 1150 && <DisplayTechnos listTechnos={technos} size={windowSize} />}
                {(side === 'left' || windowSize < 1150) && <div className='description'><ReactMarkdown source={description} /></div>}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Project