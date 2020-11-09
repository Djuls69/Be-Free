import { db } from '../../firebase/firebase'
import { FETCH_ADVERTS } from '../types'

export const fetchAdverts = () => async dispatch => {
  const adverts = []
  try {
    const res = await db.collection('jobs').get()
    res.forEach(doc => adverts.push(doc.data()))
    dispatch({
      type: FETCH_ADVERTS,
      payload: adverts
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const createAdvert = (formData, history) => async dispatch => {
  try {
    await db.collection('jobs').doc(formData.id).set(formData)
    history.push('/board')
  } catch (err) {
    console.log(err.message)
  }
}
