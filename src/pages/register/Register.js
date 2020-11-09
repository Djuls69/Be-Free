import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import DevFormRegister from '../../components/devFormRegister/DevFormRegister'

const Register = ({ history }) => {
  const [status, setStatus] = useState('dev')

  return (
    <Card>
      <Card.Body>
        <h3>S'inscrire</h3>
        <hr />
        <div className='mb-4'>
          <p>Vous êtes:</p>
          <input
            type='radio'
            name='status'
            id='dev'
            value='dev'
            checked={status === 'dev'}
            onChange={() => setStatus('dev')}
          />
          <label style={{ margin: '0 20px 0 5px' }} htmlFor='dev'>
            Développeur Web
          </label>
          <input
            type='radio'
            name='status'
            id='designer'
            value='designer'
            onChange={() => setStatus('designer')}
          />
          <label style={{ margin: '0 20px 0 5px' }} htmlFor='designer'>
            Designer UI/UX
          </label>
        </div>

        <DevFormRegister status={status} history={history} />
      </Card.Body>
    </Card>
  )
}

export default Register
