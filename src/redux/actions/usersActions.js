import { auth, db } from '../../firebase/firebase'
import { CLEAR_USER, LOGIN_USER } from '../types'

export const logoutUser = () => async dispatch => {
  try {
    await auth.signOut()
    dispatch({ type: CLEAR_USER })
    localStorage.removeItem('persist:befree')
  } catch (err) {
    console.log(err.message)
  }
}

export const loadUser = () => dispatch => {
  try {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const res = await db.collection('users').doc(user.uid).get()
        if (res.exists) {
          dispatch({
            type: LOGIN_USER,
            payload: res.data()
          })
        }
      } else {
        dispatch(logoutUser())
      }
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const registerUser = (values, history) => async dispatch => {
  const { status, companyName, firstName, lastName, email, password } = values

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    const newUser = {
      id: user.uid,
      status,
      companyName: companyName ? companyName : null,
      firstName,
      lastName,
      email,
      available: false
    }

    await db.collection('users').doc(user.uid).set(newUser)

    dispatch({
      type: LOGIN_USER,
      payload: newUser
    })
    history.push('/')
  } catch (err) {
    console.log(err.message)
  }
}

export const loginUser = (values, history) => async dispatch => {
  const { email, password } = values

  try {
    await auth.signInWithEmailAndPassword(email, password)

    dispatch(loadUser())
    history.push('/')
  } catch (err) {
    console.log(err.message)
  }
}

export const setAvailableUser = bool => async (dispatch, getState) => {
  const {
    usersReducer: { user }
  } = getState()

  try {
    await db.collection('users').doc(user.id).update({
      available: bool
    })
    dispatch(loadUser())
  } catch (err) {
    console.log(err.message)
  }
}

export const updateGeneralSection = values => async (dispatch, getState) => {
  const { title, city, skills, web, bio, avatar } = values
  const {
    usersReducer: { user }
  } = getState()

  try {
    const userProfile = await db.collection('users').doc(user.id).get()
    if (userProfile.exists) {
      await db
        .collection('users')
        .doc(user.id)
        .update({ title, city, skills, web, bio, avatar })
      dispatch(loadUser())
    } else {
      // TODO: alert
      console.log('Profile introuvable')
    }
  } catch (err) {
    console.log(err.message)
  }
}
