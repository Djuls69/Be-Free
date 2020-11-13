import { CLEAR_MESSAGES, FETCH_MESSAGES } from '../types'

const init_state = {
  loading: true,
  messages: null
}

export const messagesReducer = (state = init_state, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_MESSAGES:
      return { loading: false, messages: payload }
    case CLEAR_MESSAGES:
      return { loading: false, messages: null }
    default:
      return state
  }
}
