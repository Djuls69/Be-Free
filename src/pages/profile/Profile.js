import React, { useState } from 'react'
import { Card, Row, Col, Image, Form, Button } from 'react-bootstrap'
import { setAvailableUser } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'
import UserGeneralModal from '../../components/modals/UserGeneralModal'

const Profile = ({ history, usersReducer: { user }, setAvailableUser }) => {
  const [isAvailable, setIsAvailable] = useState(user.available)
  const [show, setShow] = useState(false)

  if (!user) {
    history.push('/login')
  }

  const handleSwitch = () => {
    if (!isAvailable) {
      setIsAvailable(true)
      setAvailableUser(true)
    } else if (isAvailable) {
      setIsAvailable(false)
      setAvailableUser(false)
    }
  }

  return (
    <section>
      <h1>Profil de {user.firstName}</h1>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={12} md={4}>
              <Image
                thumbnail
                className='mb-4'
                style={{ width: 200, height: 200, objectFit: 'cover' }}
                src={
                  user.avatar ||
                  'https://i2-prod.mirror.co.uk/incoming/article6463265.ece/ALTERNATES/s615/Doctor-Who.jpg'
                }
              />
              <p>
                Nom: {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.email}</p>
              <Form.Group style={{ display: 'flex' }}>
                <Form.Check
                  type='switch'
                  id='isAvailable-switch'
                  checked={isAvailable}
                  onChange={handleSwitch}
                />
                <Form.Label
                  style={{
                    color: isAvailable ? '#4bbf73' : '#919aa1',
                    fontWeight: 700
                  }}
                >
                  {isAvailable ? 'Disponible' : 'Non disponible'}
                </Form.Label>
              </Form.Group>
            </Col>

            <Col xs={12} md={8}>
              <div style={{ marginBottom: 50 }}>
                <h4 className='mb-4'>Général:</h4>
                <p>
                  <span className='bold'>Intitulé:</span>{' '}
                  {user.title || 'A définir'}
                </p>
                <p>
                  <span className='bold'>Ville:</span>{' '}
                  {user.city || 'A définir'}
                </p>
                <p>
                  <span className='bold'>Compétences:</span>{' '}
                  {user.skills || 'A définir'}
                </p>
                {user.web && (
                  <p>
                    <span className='bold'>Site Web:</span> {user.web}
                  </p>
                )}
                {user.bio && (
                  <p>
                    <span className='bold'>Bio:</span> {user.bio}
                  </p>
                )}
                <Button onClick={() => setShow(true)} variant='outline-primary'>
                  Modifier
                </Button>
              </div>

              <div className='mb-4'>
                <h4 className='mb-4'>Expériences:</h4>
                <p>Pas d'expériences pour le moment ...</p>
                <Button variant='outline-primary'>
                  Ajouter une expérience
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {show && <UserGeneralModal show={show} setShow={setShow} />}
    </section>
  )
}

const mapState = state => ({
  usersReducer: state.usersReducer
})

export default connect(mapState, { setAvailableUser })(Profile)
