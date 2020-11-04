import React from 'react'
import { connect } from 'react-redux'

const Profile = ({ history, usersReducer: { user } }) => {
  if (!user) {
    history.push('/login')
  }

  return (
    <section>
      <h1>Profil de {user.firstName}</h1>
    </section>
  )
}

const mapState = state => ({
  usersReducer: state.usersReducer
})

export default connect(mapState)(Profile)
