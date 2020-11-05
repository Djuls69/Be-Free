import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { updateGeneralSection } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'

const UserGeneralModal = ({ show, setShow, updateGeneralSection }) => {
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [skills, setSkills] = useState('')
  const [web, setWeb] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {})

  const handleSubmit = e => {
    e.preventDefault()
    updateGeneralSection({ title, city, skills, web, bio })
    setShow(false)
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>General:</Modal.Title>
      </Modal.Header>

      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Intitulé:</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Ville:</Form.Label>
            <Form.Control
              type='text'
              name='city'
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Compétences:</Form.Label>
            <Form.Control
              type='text'
              name='skills'
              value={skills}
              onChange={e => setSkills(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Site Web:</Form.Label>
            <Form.Control
              type='text'
              name='web'
              value={web}
              onChange={e => setWeb(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Bio:</Form.Label>
            <Form.Control
              as='textarea'
              rows={5}
              name='bio'
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='secondary'
            type='button'
            onClick={() => setShow(false)}
          >
            Fermer
          </Button>
          <Button variant='primary' type='submit'>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default connect(null, { updateGeneralSection })(UserGeneralModal)
