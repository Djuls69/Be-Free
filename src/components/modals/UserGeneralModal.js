import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const UserGeneralModal = ({ show, setShow }) => {
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [skills, setSkills] = useState([])
  const [web, setWeb] = useState('')
  const [bio, setBio] = useState('')

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>General:</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
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
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShow(false)}>
          Fermer
        </Button>
        <Button variant='primary' onClick={() => setShow(false)}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserGeneralModal
