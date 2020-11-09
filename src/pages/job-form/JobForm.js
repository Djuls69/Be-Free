import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import { createAdvert } from '../../redux/actions/advertsActions'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Titre requis'
  }
  if (!values.summary) {
    errors.summary = 'Courte description requise'
  }
  if (!values.description) {
    errors.description = 'Description requise'
  }
  if (!values.lookingFor) {
    errors.lookingFor = 'Profil recherché requis'
  }

  return errors
}

const JobForm = ({ history, createAdvert, user }) => {
  const [project, setProject] = useState('personnal')
  const [profile, setProfile] = useState('frontend')
  const [isPaid, setIsPaid] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      description: '',
      lookingFor: ''
    },
    validate,
    onSubmit: values => {
      createAdvert(
        {
          id: uuidv4(),
          user: user.id,
          avatar: user.avatar,
          project,
          profile,
          isPaid,
          title: values.title,
          summary: values.summary,
          description: values.description,
          lookingFor: values.lookingFor
        },
        history
      )
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
      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Projet</Form.Label>
            <div>
              <input
                type='radio'
                name='project-type'
                id='personnal'
                value='personnal'
                checked={project === 'personnal'}
                onChange={e => setProject(e.target.value)}
              />
              <label style={{ margin: '0 20px 0 5px' }} htmlFor='personnal'>
                Personnel
              </label>
              <input
                type='radio'
                name='project-type'
                id='professionnal'
                value='professionnal'
                onChange={e => setProject(e.target.value)}
              />
              <label style={{ margin: '0 20px 0 5px' }} htmlFor='professionnal'>
                Professionnel
              </label>
            </div>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Rémunérée ?</Form.Label>
            <div>
              <input
                type='radio'
                name='salary-type'
                id='notPaid'
                checked={!isPaid}
                onChange={() => setIsPaid(false)}
              />
              <label style={{ margin: '0 20px 0 5px' }} htmlFor='notPaid'>
                Non
              </label>
              <input
                type='radio'
                name='salary-type'
                id='paid'
                onChange={() => setIsPaid(true)}
              />
              <label style={{ margin: '0 20px 0 5px' }} htmlFor='paid'>
                Oui
              </label>
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Profil Recherché</Form.Label>
            <Form.Control
              as='select'
              onChange={e => setProfile(e.target.value)}
            >
              <option value='frontend'>Développeur front-end</option>
              <option value='backend'>Développeur back-end</option>
              <option value='designer'>Designer UI / UX</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group>
        <Form.Label>Titre *</Form.Label>
        <Form.Control
          type='text'
          name='title'
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Titre de la demande'
        />
        {touched.title && errors.title && (
          <Form.Text className='danger'>{errors.title}</Form.Text>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Description Sommaire *</Form.Label>
        <Form.Control
          type='text'
          name='summary'
          value={values.summary}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Description courte pour décrire cette annonce'
        />
        <Form.Text className='text-muted'>Maximum 200 caractères.</Form.Text>
        {touched.summary && errors.summary && (
          <Form.Text className='danger'>{errors.summary}</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Description complète *</Form.Label>
        <Form.Control
          type='text'
          name='description'
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Description de l'annonce"
        />
        {touched.description && errors.description && (
          <Form.Text className='danger'>{errors.description}</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Compétences *</Form.Label>
        <Form.Control
          type='text'
          name='lookingFor'
          value={values.lookingFor}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='ex: React, Ruby, Python'
        />
        {touched.lookingFor && errors.lookingFor && (
          <Form.Text className='danger'>{errors.lookingFor}</Form.Text>
        )}
      </Form.Group>

      <Button className='mr-4' variant='primary' type='submit'>
        Envoyer
      </Button>
    </Form>
  )
}

const mapState = state => ({
  user: state.usersReducer.user
})

export default connect(mapState, { createAdvert })(JobForm)
