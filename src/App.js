import React from 'react'

import Routes from './components/commons/Routes'

import './App.css';

function App(props) {
  console.log(props)
  return(
    <div className='app'>
      <Routes />
    </div>
  )
}

export default App;
