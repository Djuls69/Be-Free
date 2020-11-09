import { db } from '../../firebase/firebase'
import {
  CLEAR_ONE_PROFILE,
  FILTER_BY_DESIGNERS,
  FILTER_BY_DEVS,
  GET_ALL_PROFILES
} from '../types'

export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_ONE_PROFILE })
  try {
    const profiles = []
    const res = await db.collection('users').get()
    res.forEach(user => profiles.push(user.data()))
    dispatch({
      type: GET_ALL_PROFILES,
      payload: profiles
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const getAllDevs = () => async dispatch => {
  try {
    await dispatch(getAllProfiles())
    dispatch({ type: FILTER_BY_DEVS })
  } catch (err) {
    console.log(err.message)
  }
}

export const getAllDesigners = () => async dispatch => {
  try {
    await dispatch(getAllProfiles())
    dispatch({ type: FILTER_BY_DESIGNERS })
  } catch (err) {
    console.log(err.message)
  }
}
