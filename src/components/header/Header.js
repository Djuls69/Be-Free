import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { logoutUser } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'

const Header = ({ usersReducer, logoutUser, history }) => {
  const { user } = usersReducer

  const handleLogout = () => {
    logoutUser()
    history.push('/')
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
        <NavDropdown
          title={`Bonjour ${user.firstName}`}
          id='basic-nav-dropdown'
        >
          <NavDropdown.Item as={Link} to={`/profile/${user.id}`}>
            Mon profil
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>
            Se déconnecter
          </NavDropdown.Item>
        </NavDropdown>
      )
    }
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Be Free
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>{displayContent()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const mapState = state => ({
  usersReducer: state.usersReducer
})

export default withRouter(connect(mapState, { logoutUser })(Header))
