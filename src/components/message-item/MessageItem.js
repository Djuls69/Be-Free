import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import Moment from 'react-moment'
import { connect } from 'react-redux'

const JobItem = ({ message, user, profiles }) => {
  const { id, from, to, read, createdAt, subject, body } = message

  const displayRecipient = () => {
    let recipient
    if (from === user.id) {
      recipient = profiles.find(profile => profile.id === to)
    } else if (to === user.id) {
      recipient = profiles.find(profile => profile.id === from)
    }
    return `${recipient.firstName} ${recipient.lastName}`
  }

  return (
    <Card className='mb-4' as={Link} to={`/messages/${id}`}>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{subject}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              {from === user.id ? 'Envoyé le: ' : 'Reçu le: '}{' '}
              <Moment format='DD/MM/YYYY'>{createdAt}</Moment>
            </Card.Subtitle>
            <Card.Subtitle>
              Conversation avec: {displayRecipient()}
            </Card.Subtitle>
            <Card.Text>
              {/* {to === user.id && read ? (
                'Message Lu'
              ) : (
                <span style={{ fontWeight: 700 }}>Message Non Lu</span>
              )} */}
              {to === user.id &&
                (!read ? (
                  <span style={{ fontWeight: 700 }}>Message Non Lu</span>
                ) : (
                  'Message Lu'
                ))}
            </Card.Text>
            <Card.Text>{body.substr(0, 50)}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

const mapState = state => ({
  user: state.usersReducer.user,
  profiles: state.allProfilesReducer.profiles
})

export default connect(mapState)(JobItem)
