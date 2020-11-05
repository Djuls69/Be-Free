import React from 'react'
import './AvailableItem.css'

const AvailableItem = ({ available }) => {
  return (
    <div className='available-item'>
      <p>
        {available ? (
          <span>
            <i style={{ color: '#4bbf73' }} className='fas fa-check' />{' '}
            Disponible
          </span>
        ) : (
          <span>
            <i style={{ color: '#d9534f' }} className='fas fa-times' /> Non
            disponible
          </span>
        )}
      </p>
    </div>
  )
}

export default AvailableItem
