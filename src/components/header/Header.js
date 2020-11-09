import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { logoutUser } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'

const Header = ({ usersReducer, logoutUser, history }) => {
  const { user } = usersReducer

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
        <Navbar.Brand>Collides</Navbar.Brand>
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
  usersReducer: state.usersReducer
})

export default withRouter(connect(mapState, { logoutUser })(Header))
