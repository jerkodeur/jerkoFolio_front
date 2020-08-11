import React from 'react'
import Proptypes from 'prop-types'

import './DisplayTechnos.css'

const DisplayTechnos = ({ listTechnos }) => {
  return (
    <div className='cont-img-technos'>
      {listTechnos &&
        listTechnos.map((techno, id) => {
          const img = require(`../../images/icones/${techno.image_name}`)
          return (
            <div key={id}>
              <img src={img} alt={techno.name} title={techno.name} />
            </div>
          )
        })}
    </div>
  )
}

DisplayTechnos.propTypes = {
  listTechnos: Proptypes.arrayOf(Object).isRequired
}
export default DisplayTechnos
