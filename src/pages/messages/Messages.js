import React from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import MessageItem from '../../components/message-item/MessageItem'

const Messages = ({ messagesReducer }) => {
  const { loading, messages } = messagesReducer

  return (
    <section>
      <h1>Liste de vos conversations</h1>
      <hr />
      {loading ? (
        <Spinner animation='border' variant='info' />
      ) : !loading && !messages ? (
        <h4>Pas de messages pour le moment...</h4>
      ) : (
        messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))
      )}
    </section>
  )
}

const mapState = state => ({
  messagesReducer: state.messagesReducer
})

export default connect(mapState)(Messages)
