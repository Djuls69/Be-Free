import React, { useState, useEffect, Fragment } from 'react'
import { db } from '../../firebase/firebase'
import { Card, Row, Col, Image, Form, Button } from 'react-bootstrap'
import { setAvailableUser } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'
import UserGeneralModal from '../../components/modals/UserGeneralModal'

const Profile = ({ match, usersReducer, setAvailableUser }) => {
  const { user } = usersReducer
  const profileID = match.params.profileID
  const [isAvailable, setIsAvailable] = useState(false)
  const [loadedUser, setLoadedUser] = useState({})
  const [show, setShow] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await db.collection('users').doc(profileID).get()
        if (profile.exists) {
          setIsOwner(false)
          setIsAvailable(profile.data().available)
          return setLoadedUser(profile.data())
        } else {
          console.log('Utilisateur introuvable')
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    if (user && user.id === profileID) {
      setIsOwner(true)
      setIsAvailable(user.available)
      return setLoadedUser(user)
    } else {
      fetchData()
    }
  }, [loadedUser.available, profileID, user])

  // Switch available
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
      <Fragment>
        <h1>Profil de {loadedUser.firstName}</h1>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={12} md={4}>
                <Image
                  thumbnail
                  className='mb-4'
                  style={{ width: 200, height: 200, objectFit: 'cover' }}
                  src={
                    loadedUser.avatar ||
                    'https://i2-prod.mirror.co.uk/incoming/article6463265.ece/ALTERNATES/s615/Doctor-Who.jpg'
                  }
                />
                <p>
                  Nom: {loadedUser.firstName} {loadedUser.lastName}
                </p>
                <p>Email: {loadedUser.email}</p>
                <Form.Group style={{ display: 'flex' }}>
                  {isOwner ? (
                    <Fragment>
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
                    </Fragment>
                  ) : (
                    <Form.Text
                      style={{
                        color: loadedUser.available ? '#4bbf73' : '#919aa1',
                        fontWeight: 700
                      }}
                    >
                      {loadedUser.available ? 'Disponible' : 'Non disponible'}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>

              <Col xs={12} md={8}>
                <div style={{ marginBottom: 50 }}>
                  <h4 className='mb-4'>Général:</h4>
                  <p>
                    <span className='bold'>Intitulé:</span>{' '}
                    {loadedUser.title || 'A définir'}
                  </p>
                  <p>
                    <span className='bold'>Ville:</span>{' '}
                    {loadedUser.city || 'A définir'}
                  </p>
                  <p>
                    <span className='bold'>Compétences:</span>{' '}
                    {loadedUser.skills || 'A définir'}
                  </p>
                  {loadedUser.web && (
                    <p>
                      <span className='bold'>Site Web:</span> {loadedUser.web}
                    </p>
                  )}
                  {loadedUser.bio && (
                    <p>
                      <span className='bold'>Bio:</span> {loadedUser.bio}
                    </p>
                  )}
                  {isOwner && (
                    <Button
                      onClick={() => setShow(true)}
                      variant='outline-primary'
                    >
                      Modifier
                    </Button>
                  )}
                </div>

                <div className='mb-4'>
                  <h4 className='mb-4'>Expériences:</h4>
                  <p>Pas d'expériences pour le moment ...</p>
                  {isOwner && (
                    <Button variant='outline-primary'>
                      Ajouter une expérience
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {show && <UserGeneralModal show={show} setShow={setShow} />}
      </Fragment>
    </section>
  )
}

const mapState = state => ({
  usersReducer: state.usersReducer
})

export default connect(mapState, { setAvailableUser })(Profile)
