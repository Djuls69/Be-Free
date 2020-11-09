import { combineReducers } from 'redux'
import { usersReducer } from './usersReducer'
import { allProfilesReducer } from './profilesReducer'
import { advertsReducer } from './advertsReducer'

const rootReducer = combineReducers({
  usersReducer,
  allProfilesReducer,
  advertsReducer
})

export default rootReducer
