import React, { useState } from 'react'
import { Form, Card } from 'react-bootstrap'
import CompanyFormRegister from '../../components/companyFormRegister/CompanyFormRegister'
import DevFormRegister from '../../components/devFormRegister/DevFormRegister'

const Register = () => {
  const [dev, setDev] = useState(true)
  const [company, setCompany] = useState(false)

  return (
    <Card>
      <Card.Body>
        <h3>S'inscrire</h3>
        <hr />
        <div className='mb-4'>
          <p>Vous êtes:</p>
          <Form.Check
            inline
            name='status'
            label="à la recherche d'un emploi"
            checked={dev}
            value={dev}
            onChange={() => {
              setDev(true)
              setCompany(false)
            }}
            type='radio'
          />
          <Form.Check
            inline
            name='status'
            label="représentant d'une entreprise"
            value={company}
            onChange={() => {
              setCompany(true)
              setDev(false)
            }}
            type='radio'
          />
        </div>

        {dev ? <DevFormRegister /> : <CompanyFormRegister />}
      </Card.Body>
    </Card>
  )
}

export default Register
