import { combineReducers } from 'redux'
import { usersReducer } from './usersReducer'
import { allProfilesReducer } from './profilesReducer'

const rootReducer = combineReducers({
  usersReducer,
  allProfilesReducer
})

export default rootReducer
