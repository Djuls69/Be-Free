import { db } from '../../firebase/firebase'

export const createAdvert = (formData, history) => async dispatch => {
  try {
    await db.collection('jobs').doc(formData.id).set(formData)
    history.push('/board')
  } catch (err) {
    console.log(err.message)
  }
}
