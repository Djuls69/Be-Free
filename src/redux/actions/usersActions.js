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

export const registerUser = values => async dispatch => {
  const { status, companyName, firstName, lastName, email, password } = values

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    const newUser = {
      id: user.uid,
      status,
      companyName: companyName ? companyName : null,
      firstName,
      lastName,
      email
    }

    await db.collection('users').doc(user.uid).set(newUser)

    dispatch({
      type: LOGIN_USER,
      payload: newUser
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const logoutUser = () => {}
