import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import Contact from '../commons/Contact'
import Header from '../commons/Header'

import './Home.css'

import ProfilPhoto from '../../images/me.jpeg'
import MyPrez from './MyPres.md'

const Home = (props) => {

  const [mdPrez, setMdPrez] = useState()
  const [windowSize, setWindowSize] = useState()

  useEffect(() => {
    fetch(MyPrez)
      .then((response) => {
        if (response.ok) return response.text()
        else return Promise.reject("Didn't fetch text correctly")
      })
      .then((text) => {
        setMdPrez(text)
      })
      .catch((error) => console.error(error))
  })

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
      <Header location={props.location.pathname} windowSize={windowSize} />
      <div className='cont-home'>
        <div className='flex-home'>
          {windowSize <= 960 &&
            <div className='profil-title'>
              <h1>Développeur Web / Web Mobile</h1>
            </div>
          }
          <div className='flex-profil'>
            <img src={ProfilPhoto} alt='' className='profil-photo' />
            <label>Identité </label>
            <div className='div-infos'>
              <div className='flex-ident'>
                <h4 className='cat'>Nom:</h4>
                <p className='infos'>Potié</p>
              </div>
              <div className='flex-ident'>
                <h4 className='cat'>Prénom:</h4>
                <p className='infos'>Jérôme</p>
              </div>
              <div className='flex-ident'>
                <h4 className='cat'>Alias:</h4>
                <p className='infos'>Jerkoder</p>
              </div>
            </div>
          </div>
          { windowSize > 960 &&
          <div className='profil-title'>
            <h1>Développeur Web / Web Mobile</h1>
          </div>
          }
          <div className='profil-description'>
            <h1>Présentation</h1>
            <div class='presentation'>
              <ReactMarkdown source={mdPrez} />
            </div>
          </div>
        </div>
        {windowSize < 450 && <Contact />}
      </div>
    </div>
  )
}

export default Home