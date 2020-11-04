import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/header/Header'
import { Container } from 'react-bootstrap'
import Register from './pages/register/Register'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route exact path='/' component={() => <h1>Home</h1>} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Container>
      </main>
    </Router>
  )
}

export default App
