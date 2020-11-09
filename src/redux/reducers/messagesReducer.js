import { FETCH_MESSAGES, FETCH_UNREAD_MESSAGES } from '../types'

const init_state = {
  loading: true,
  messages: [],
  unreadMessages: []
}

export const messagesReducer = (state = init_state, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_MESSAGES:
      return { loading: false, messages: payload }
    case FETCH_UNREAD_MESSAGES:
      return { ...state, unreadMessages: payload }
    default:
      return state
  }
}
