import { db } from '../../firebase/firebase'
import { FETCH_MESSAGES, FETCH_UNREAD_MESSAGES } from '../types'

export const fetchAllMessages = () => async dispatch => {
  const messages = []
  try {
    const res = await db.collection('messages').get()
    res.forEach(doc => messages.push(doc.data()))
    dispatch({
      type: FETCH_MESSAGES,
      payload: messages
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const fetchUnreadMessages = () => async (dispatch, getState) => {
  const unreadMessages = []
  const {
    usersReducer: { user }
  } = getState()
  try {
    const res = await db
      .collection('messages')
      .where('to', '==', user.id)
      .where('read', '==', false)
      .get()
    res.forEach(doc => unreadMessages.push(doc.data()))
    dispatch({
      type: FETCH_UNREAD_MESSAGES,
      payload: unreadMessages
    })
  } catch (err) {
    console.log(err.message)
  }
}
