import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { updateGeneralSection } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'

const UserGeneralModal = ({ show, setShow, updateGeneralSection, user }) => {
  const [title, setTitle] = useState(user.title || '')
  const [avatar, setAvatar] = useState(user.avatar || '')
  const [city, setCity] = useState(user.city || '')
  const [skills, setSkills] = useState(user.skills.join(', ') || '')
  const [web, setWeb] = useState(user.web || '')
  const [bio, setBio] = useState(user.bio || '')

  const handleSubmit = e => {
    e.preventDefault()
    const trimed = []
    skills.split(',').map(skill => trimed.push(skill.trim()))
    updateGeneralSection({ title, city, skills: trimed, web, bio, avatar })
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
            <Form.Label>Avatar:</Form.Label>
            <Form.Control
              type='text'
              name='avatar'
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              placeholder='URL de votre avatar'
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
            <Form.Text className='text-muted'>
              Merci de séparer chaque compétence par une virgule.
            </Form.Text>
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
