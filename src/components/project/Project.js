import React, { useLayoutEffect, useEffect, useState } from 'react'
import Axios from 'axios'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

import 'moment/locale/fr'

import DisplayTechnos from './DisplayTechnos';
import Header from '../commons/Header'

import './Project.css'

import Edit from '../../images/modify.png' //TODO to come up
import Www from '../../images/www.svg'
import Github from '../../images/github.png'

const Project = (props) => {
  const token = localStorage.getItem('token')

  const [projects, setProjects] = useState()
  const [windowSize, setWindowSize] = useState()

  useEffect(() => {
    Axios.get('/projects')
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
                {side === 'right' && windowSize > 1050 &&
                  <>
                    <div className='cont-description'>
                      <div className='description'>
                        <ReactMarkdown source={description} />
                      </div>
                      <div className='flex-github'>
                        <img src={Github} alt='' />
                        <a href={url_github} title='Voir le dépôt github du projet' target='_blank' rel="noopener noreferrer">
                          {url_github}
                        </a>
                      </div>
                    </div>
                    <DisplayTechnos listTechnos={technos} />
                  </>
                }
                <div className={side}>
                  <div className='infos-project'>
                    <div className='title'>
                      {side === 'left' &&
                        <>
                          <h1>{title}</h1>
                        </>
                      }
                      <span className={side === 'left' ? 'date-right' : 'date-left'}>
                        {side === 'left' &&
                          <>
                            {token &&
                              <a href='#todo' title='Modifier le contenu du projet'><img src={Edit} alt='Modifer' className='modify-project' /></a>
                            }
                            <a href={url_test} title='Voir le site' target='_blank' rel="noopener noreferrer">
                              <img src={Www} alt='' />
                            </a>
                          </>
                        }
                        {tempDate}

                        {side === 'right' &&
                          <>
                            <a href={url_test} title='Voir le site' target='_blank' rel="noopener noreferrer">
                              <img src={Www} alt='' />
                            </a>
                            {token &&
                              <a href='#todo' title='Modifier le contenu du projet'><img src={Edit} alt='Modifer' className='modify-project' /></a>
                            }
                          </>
                        }
                      </span>
                      {side === 'right' && <h1>{title}</h1>}
                    </div>
                  </div>
                  <div className={side === 'left' ? 'cont-screenshot-Tleft' : 'cont-screenshot-Tright'}>
                    {side === 'right' && windowSize < 1050 &&
                      <DisplayTechnos listTechnos={technos} />
                    }
                    <img src={tempImage} alt='Screenshot du projet' className='project-img' />
                    {side === 'left' && windowSize < 1050 &&
                      <DisplayTechnos listTechnos={technos} />
                    }
                  </div>
                </div>
                {side === 'left' && windowSize > 1050 &&
                  <DisplayTechnos listTechnos={technos} />}
                {(side === 'left' || windowSize < 1050) &&
                  <div className='cont-description'>
                    <div className='description'>
                      <ReactMarkdown source={description} />
                    </div>
                    <div className='flex-github'>
                      <img src={Github} alt='' />
                      <a href={url_github} title='Voir le dépôt github du projet' target='_blank' rel="noopener noreferrer">
                        {url_github}
                      </a>
                    </div>
                  </div>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Project