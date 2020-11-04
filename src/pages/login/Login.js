import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { loginUser } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Adresse email requise'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Adresse email invalide'
  }
  if (!values.password) {
    errors.password = 'Mot de passe requis'
  }

  return errors
}

const Login = ({ loginUser, history }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      loginUser(values, history)
    }
  })
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched
  } = formik

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Adresse email</Form.Label>
        <Form.Control
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Votre adresse email'
        />
        {touched.email && errors.email && (
          <Form.Text className='danger'>{errors.email}</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Votre mot de passe'
        />
        {touched.password && errors.password && (
          <Form.Text className='danger'>{errors.password}</Form.Text>
        )}
      </Form.Group>

      <Button className='mr-4' variant='primary' type='submit'>
        Envoyer
      </Button>

      <Button variant='info' type='button'>
        Se connecter avec Google
      </Button>
    </Form>
  )
}

export default connect(null, { loginUser })(Login)
