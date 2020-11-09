import { GET_ALL_PROFILES, FILTER_BY_DEVS, FILTER_BY_DESIGNERS } from '../types'

const ALL_PROFILES = {
  loading: true,
  profiles: []
}

export const allProfilesReducer = (state = ALL_PROFILES, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_PROFILES:
      return { loading: false, profiles: payload }
    case FILTER_BY_DEVS:
      return {
        loading: false,
        profiles: state.profiles.filter(dev => dev.status === 'dev')
      }
    case FILTER_BY_DESIGNERS:
      return {
        loading: false,
        profiles: state.profiles.filter(dev => dev.status === 'designer')
      }
    default:
      return state
  }
}
