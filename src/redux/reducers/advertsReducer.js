import { FETCH_ADVERTS } from '../types'

const init_state = {
  loading: true,
  adverts: []
}

export const advertsReducer = (state = init_state, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ADVERTS:
      return { loading: false, adverts: payload }
    default:
      return state
  }
}
