import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header/Header'
import Register from './pages/register/Register'
import { loadUser } from './redux/actions/usersActions'
import { getAllProfiles } from './redux/actions/profilesActions'
import { fetchUnreadMessages } from './redux/actions/messagesActions'
import { connect } from 'react-redux'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import Board from './pages/board/Board'
import JobForm from './pages/job-form/JobForm'

const App = ({ loadUser, getAllProfiles, fetchUnreadMessages }) => {
  useEffect(() => {
    loadUser()
    getAllProfiles()
    fetchUnreadMessages()
  }, [loadUser, getAllProfiles, fetchUnreadMessages])

  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/board' component={Board} />
            <Route exact path='/job-form' component={JobForm} />
            <Route exact path='/profile/:profileID' component={Profile} />
          </Switch>
        </Container>
      </main>
    </Router>
  )
}

const mapState = state => ({
  user: state.usersReducer.user
})

export default connect(mapState, {
  loadUser,
  getAllProfiles,
  fetchUnreadMessages
})(App)
