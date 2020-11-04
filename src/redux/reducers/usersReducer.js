import { LOGIN_USER, CLEAR_USER } from '../types'

const init_state = {
  loading: true,
  user: null
}

export const usersReducer = (state = init_state, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_USER:
      return { loading: false, user: payload }
    case CLEAR_USER:
      return { loading: true, user: null }
    default:
      return state
  }
}
