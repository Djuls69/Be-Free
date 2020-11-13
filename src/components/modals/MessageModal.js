import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createMessage } from '../../redux/actions/messagesActions'
import { connect } from 'react-redux'

const MessageModal = ({ setShowMessage, target, createMessage }) => {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    await createMessage({ subject, body }, target)
    setShowMessage(false)
  }

  return (
    <Modal show={true} onHide={() => setShowMessage(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Envoyer un message:</Modal.Title>
      </Modal.Header>

      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Sujet *</Form.Label>
            <Form.Control
              type='text'
              name='subject'
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder='Le sujet de votre message'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Message *</Form.Label>
            <Form.Control
              as='textarea'
              rows={5}
              name='body'
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder='Votre message'
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='secondary'
            type='button'
            onClick={() => setShowMessage(false)}
          >
            Fermer
          </Button>
          <Button variant='primary' type='submit'>
            Envoyer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default connect(null, { createMessage })(MessageModal)
