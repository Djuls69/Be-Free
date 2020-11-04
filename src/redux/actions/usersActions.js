import { auth, db } from '../../firebase/firebase'
import { CLEAR_USER, LOGIN_USER } from '../types'

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
        dispatch({ type: CLEAR_USER })
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

export const logoutUser = history => async dispatch => {
  try {
    await auth.signOut()
    dispatch({ type: CLEAR_USER })
    localStorage.removeItem('persist:befree')
    history.push('/login')
  } catch (err) {
    console.log(err.message)
  }
}
