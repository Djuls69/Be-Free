import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import { setMessageRead } from '../../redux/actions/messagesActions'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import MessageModal from '../../components/modals/MessageModal'

const Message = ({
  messages,
  match,
  history,
  profiles,
  user,
  setMessageRead
}) => {
  const messageID = match.params.messageID
  const [message, setMessage] = useState({})
  const [recipient, setRecipient] = useState({})
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const foundMessage = messages.find(mess => mess.id === messageID)
    if (!foundMessage) {
      history.push('/messages')
    } else {
      if (foundMessage.from === user.id) {
        setRecipient(profiles.find(profile => profile.id === foundMessage.to))
      } else if (foundMessage.to === user.id) {
        setRecipient(profiles.find(profile => profile.id === foundMessage.from))
      }
      setMessage(foundMessage)
      setMessageRead(messageID)
    }
  }, [messageID, messages, message, history, user.id, profiles, setMessageRead])

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 80
        }}
      >
        <div>
          <h2>Titre: {message.subject}</h2>
          <Link
            to={`/profile/${recipient.id}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Image
              src={recipient.avatar}
              alt={`${recipient.firstName} ${recipient.lastName}`}
              rounded
              style={{ width: 30, height: 30, objectFit: 'cover' }}
            />
            <h5 style={{ margin: 0, marginLeft: 10 }}>
              {recipient.firstName} {recipient.lastName}
            </h5>
          </Link>
        </div>

        <div>
          <Moment format='DD/MM/YYYY'>{message.createdAt}</Moment>
        </div>
      </div>

      <div style={{ marginBottom: 80 }}>
        <h2>Message:</h2>
        <p>{message.body}</p>
      </div>

      <div style={{ display: 'flex' }}>
        <Button className='mr-4' onClick={() => setShowMessage(true)}>
          Répondre
        </Button>
        <Button
          className='mr-4'
          variant='outline-primary'
          onClick={() => history.goBack()}
        >
          Retour
        </Button>
      </div>

      {showMessage && (
        <MessageModal setShowMessage={setShowMessage} target={recipient.id} />
      )}
    </Fragment>
  )
}

const mapState = state => ({
  messages: state.messagesReducer.messages,
  profiles: state.allProfilesReducer.profiles,
  user: state.usersReducer.user
})

export default connect(mapState, { setMessageRead })(Message)
