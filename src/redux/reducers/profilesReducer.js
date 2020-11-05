import { GET_ALL_PROFILES } from '../types'

const ALL_PROFILES = {
  loading: true,
  profiles: []
}

export const allProfilesReducer = (state = ALL_PROFILES, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_PROFILES:
      return { loading: false, profiles: payload }
    default:
      return state
  }
}
