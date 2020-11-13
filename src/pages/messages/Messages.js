import React, { useState, useEffect } from 'react'
import { fetchAllMessages } from '../../redux/actions/messagesActions'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import MessageItem from '../../components/message-item/MessageItem'

const Messages = ({ messagesReducer, user, fetchAllMessages }) => {
  const { loading, messages } = messagesReducer

  const [checkMessages, setCheckMessages] = useState('received')

  useEffect(() => {
    fetchAllMessages()
  }, [fetchAllMessages])

  const displayMessages = () => {
    if (checkMessages === 'received') {
      return messages.map(
        message =>
          message.to === user.id && (
            <MessageItem key={message.id} message={message} />
          )
      )
    } else if (checkMessages === 'sended') {
      return messages.map(
        message =>
          message.from === user.id && (
            <MessageItem key={message.id} message={message} />
          )
      )
    } else {
      return messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))
    }
  }

  return (
    <section>
      <h1>Liste de vos conversations</h1>
      <hr />

      <form style={{ display: 'flex', marginBottom: 40 }} noValidate>
        <div style={{ marginRight: 20 }}>
          <input
            style={{ marginRight: 10 }}
            type='radio'
            name='radio-message'
            id='received-messages'
            value={'received'}
            onChange={() => setCheckMessages('received')}
            checked={checkMessages === 'received'}
          />
          <label htmlFor='received-messages'>Messages Reçus</label>
        </div>

        <div style={{ marginRight: 20 }}>
          <input
            style={{ marginRight: 10 }}
            type='radio'
            name='radio-message'
            id='sended-messages'
            value={'sended'}
            onChange={() => setCheckMessages('sended')}
            checked={checkMessages === 'sended'}
          />
          <label htmlFor='sended-messages'>Messages Envoyés</label>
        </div>

        <div style={{ marginRight: 20 }}>
          <input
            style={{ marginRight: 10 }}
            type='radio'
            name='radio-message'
            id='all-messages'
            value={'all-messages'}
            onChange={() => setCheckMessages('all-messages')}
            checked={checkMessages === 'all-messages'}
          />
          <label htmlFor='all-messages'>Tous Mes Messages</label>
        </div>
      </form>

      {loading ? (
        <Spinner animation='border' variant='info' />
      ) : !loading && !messages ? (
        <h4>Pas de messages pour le moment...</h4>
      ) : (
        displayMessages()
      )}
    </section>
  )
}

const mapState = state => ({
  messagesReducer: state.messagesReducer,
  user: state.usersReducer.user
})

export default connect(mapState, { fetchAllMessages })(Messages)
