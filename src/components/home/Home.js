import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import Contact from '../commons/Contact'
import Header from '../commons/Header'
import Profil from './Profil'


import './Home.css'

import MyPrez from './MyPres.md'

const Home = (props) => {

  const [mdPrez, setMdPrez] = useState()
  const [windowSize, setWindowSize] = useState()
  const [displayForm, setDisplayForm] = useState(false)
  const [connected, setConnected] = useState(false)

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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setConnected(true)
    }
  }, [connected])

  const defineIfConnect = () => {
    setConnected(!connected)
  }

  // Define the width of the screen
  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize(window.innerWidth,)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const Title = () => (
    <div className='profil-title'>
      <h1>Développeur Web / <span onClick={() => setDisplayForm(!displayForm)}>W</span>eb Mobile</h1>
    </div>
  )

  return (
    <div>
      <Header location={props.location.pathname} />
      <div className='cont-home'>
        <div className='flex-home'>
          <div className='flex-profil'>
            <Title />
            <Profil displayForm={displayForm} defineIfConnect={defineIfConnect} connected={connected} />
          </div>
          <div className='profil-description'>
            <div className='presentation'>
              <ReactMarkdown source={ mdPrez } escapeHtml={ false }/>
            </div>
          </div>
        </div>
        {windowSize < 535 && <Contact />}
      </div>
    </div>
  )
}

export default Home