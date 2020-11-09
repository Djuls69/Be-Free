import { combineReducers } from 'redux'
import { usersReducer } from './usersReducer'
import { allProfilesReducer } from './profilesReducer'
import { advertsReducer } from './advertsReducer'
import { messagesReducer } from './messagesReducer'

const rootReducer = combineReducers({
  usersReducer,
  allProfilesReducer,
  advertsReducer,
  messagesReducer
})

export default rootReducer
