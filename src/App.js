import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header/Header'
import Register from './pages/register/Register'
import { loadUser } from './redux/actions/usersActions'
import { connect } from 'react-redux'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route exact path='/' component={() => <h1>Home</h1>} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </Container>
      </main>
    </Router>
  )
}

const mapState = state => ({
  user: state.usersReducer.user
})

export default connect(mapState, { loadUser })(App)
