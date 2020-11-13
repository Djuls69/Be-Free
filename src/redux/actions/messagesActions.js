import { db } from '../../firebase/firebase'
import { v4 as uuidv4 } from 'uuid'
import { loadUser } from './usersActions'
import { FETCH_MESSAGES } from '../types'

export const fetchAllMessages = () => async (dispatch, getState) => {
  const {
    usersReducer: { user }
  } = getState()
  const messages = []

  try {
    const res = await db.collection('messages').get()
    res.forEach(doc => {
      user.conversations.find(
        conv => conv === doc.id && messages.push(doc.data())
      )
    })

    dispatch({
      type: FETCH_MESSAGES,
      payload: messages
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const createMessage = (formData, target) => async (
  dispatch,
  getState
) => {
  const { subject, body } = formData
  const id = uuidv4()
  const {
    usersReducer: { user }
  } = getState()

  try {
    const newMessage = {
      id,
      from: user.id,
      to: target,
      subject,
      body,
      createdAt: Date.now(),
      read: false
    }
    await db.collection('messages').doc(id).set(newMessage)

    user.conversations = [...user.conversations, id]
    await db
      .collection('users')
      .doc(user.id)
      .update({ conversations: user.conversations })

    const recipient = await db.collection('users').doc(target).get()
    if (recipient.exists) {
      const conversations = [...recipient.data().conversations, id]
      await db.collection('users').doc(target).update({ conversations })
    }
    await dispatch(loadUser())
  } catch (err) {
    console.log(err.message)
  }
}
