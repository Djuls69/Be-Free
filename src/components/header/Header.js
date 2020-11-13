import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { logoutUser } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'

const Header = ({ usersReducer, messagesReducer, logoutUser, history }) => {
  const { user } = usersReducer
  const { messages } = messagesReducer

  const [unReadMessages, setUnReadMessages] = useState(0)

  useEffect(() => {
    if (messages && user) {
      setUnReadMessages(0)
      const receivedMessages = messages.filter(
        mess => mess.to === user.id && mess.read === false
      )
      setUnReadMessages(receivedMessages.length)
    } else {
      setUnReadMessages(0)
    }
  }, [messages, user])

  const handleLogout = () => {
    logoutUser()
    history.push('/login')
  }

  const displayContent = () => {
    if (!user) {
      return (
        <Fragment>
          <Nav.Link as={Link} to='/login'>
            Se connecter
          </Nav.Link>
          <Nav.Link as={Link} to='/register'>
            S'inscrire
          </Nav.Link>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Nav.Link as={Link} to='/board'>
            Board
          </Nav.Link>
          <NavDropdown title={`${user.firstName}`} id='basic-nav-dropdown'>
            <NavDropdown.Item as={Link} to={`/profile/${user.id}`}>
              Mon profil
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/messages'>
              Mes Messages{' '}
              {unReadMessages > 0 && (
                <Badge variant='danger'>{unReadMessages}</Badge>
              )}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>
              Se déconnecter
            </NavDropdown.Item>
          </NavDropdown>
        </Fragment>
      )
    }
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Collides
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link as={Link} to='/'>
              Membres
            </Nav.Link>
            {displayContent()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const mapState = state => ({
  usersReducer: state.usersReducer,
  messagesReducer: state.messagesReducer
})

export default withRouter(connect(mapState, { logoutUser })(Header))
