import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import { registerUser } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}

  if (!values.companyName) {
    errors.companyName = 'Nom de votre entreprise requis'
  }
  if (!values.firstName) {
    errors.firstName = 'Prénom requis'
  }
  if (!values.lastName) {
    errors.lastName = 'Nom requis'
  }
  if (!values.email) {
    errors.email = 'Adresse email requise'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Adresse email invalide'
  }
  if (!values.password) {
    errors.password = 'Mot de passe requis'
  } else if (values.password.length < 6) {
    errors.password = 'Au minimum 6 caractères'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirmation du mot de passe requis'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas'
  }

  return errors
}

const CompanyFormRegister = ({ registerUser, history }) => {
  const formik = useFormik({
    initialValues: {
      status: 'company',
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate,
    onSubmit: values => {
      registerUser(values, history)
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
        <Form.Label>Entreprise</Form.Label>
        <Form.Control
          type='text'
          name='companyName'
          value={values.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Nom de l'entreprise"
        />
        {touched.companyName && errors.companyName && (
          <Form.Text className='danger'>{errors.companyName}</Form.Text>
        )}
      </Form.Group>

      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type='text'
              name='firstName'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Votre prénom'
            />
            {touched.firstName && errors.firstName && (
              <Form.Text className='danger'>{errors.firstName}</Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type='text'
              name='lastName'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Votre nom'
            />
            {touched.lastName && errors.lastName && (
              <Form.Text className='danger'>{errors.lastName}</Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

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

      <Row>
        <Col xs={12} md={6}>
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
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Confirmer le mot de passe</Form.Label>
            <Form.Control
              type='password'
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Veuillez répéter votre mot de passe'
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Form.Text className='danger'>{errors.confirmPassword}</Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Button className='mr-4' variant='primary' type='submit'>
        Envoyer
      </Button>
    </Form>
  )
}

export default connect(null, { registerUser })(CompanyFormRegister)
