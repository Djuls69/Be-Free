import { db } from '../../firebase/firebase'
import { CLEAR_ONE_PROFILE, GET_ALL_PROFILES } from '../types'

export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_ONE_PROFILE })
  try {
    const profiles = []
    const res = await db.collection('users').where('status', '==', 'dev').get()
    res.forEach(user => profiles.push(user.data()))
    dispatch({
      type: GET_ALL_PROFILES,
      payload: profiles
    })
  } catch (err) {
    console.log(err.message)
  }
}
