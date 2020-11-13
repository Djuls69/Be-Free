import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Moment from 'react-moment'
import { connect } from 'react-redux'

const JobItem = ({ message, user, profiles }) => {
  const { id, from, to, read, createdAt, subject } = message

  const displayRecipient = () => {
    let recipient = null
    if (user.id && from === user.id) {
      recipient = profiles.find(profile => profile.id === to)
    } else if (user.id && to === user.id) {
      recipient = profiles.find(profile => profile.id === from)
    }

    if (recipient) {
      return `${recipient.firstName} ${recipient.lastName}`
    } else {
      return
    }
  }

  return (
    <Card className='mb-4'>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card.Title>
            {displayRecipient()} - {subject}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            <Moment format='DD/MM/YYYY'>{createdAt}</Moment>
          </Card.Subtitle>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card.Link
            style={{ color: '#1f9bcf' }}
            as={Link}
            to={`/message/${id}`}
          >
            Lire ce message
          </Card.Link>
          <Card.Text>
            {to === user.id && !read && (
              <span style={{ fontWeight: 700 }}>Message Non Lu</span>
            )}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  )
}

const mapState = state => ({
  user: state.usersReducer.user,
  profiles: state.allProfilesReducer.profiles
})

export default connect(mapState)(JobItem)
