import React, { useState, useEffect, Fragment } from 'react'
import { db } from '../../firebase/firebase'
import { Card, Row, Col, Image, Form, Button } from 'react-bootstrap'
import { setAvailableUser } from '../../redux/actions/usersActions'
import { connect } from 'react-redux'
import UserGeneralModal from '../../components/modals/UserGeneralModal'
import MessageModal from '../../components/modals/MessageModal'

const Profile = ({ history, match, usersReducer, setAvailableUser }) => {
  const { user } = usersReducer
  const profileID = match.params.profileID
  const [isLoading, setIsLoading] = useState(true)
  const [isAvailable, setIsAvailable] = useState(false)
  const [loadedUser, setLoadedUser] = useState({})
  const [isOwner, setIsOwner] = useState(false)
  const [show, setShow] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await db.collection('users').doc(profileID).get()
        if (profile.exists) {
          setIsOwner(false)
          setIsAvailable(profile.data().available)
          setLoadedUser(profile.data())
          setIsLoading(false)
        } else {
          console.log('Utilisateur introuvable')
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    if (user && user.id === profileID) {
      setIsLoading(false)
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
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <Fragment>
          <h1>
            {isOwner ? 'Mon Profil' : `Profil de ${loadedUser.firstName}`}
          </h1>
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
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
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

                  {!isOwner && (
                    <Button
                      variant='outline-primary'
                      onClick={() => setShowMessage(true)}
                    >
                      <i className='mr-2 far fa-paper-plane'></i> Envoyer un
                      message
                    </Button>
                  )}
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
                      {loadedUser.skills
                        ? loadedUser.skills.join(', ')
                        : 'A définir'}
                    </p>
                    {loadedUser.web && (
                      <p>
                        <span className='bold'>Site Web:</span>{' '}
                        <a
                          style={{ color: '#1f9bcf' }}
                          href={loadedUser.web}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {loadedUser.web}
                        </a>
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

          <Button className='mt-4' onClick={() => history.goBack()}>
            Retour
          </Button>

          {show && (
            <UserGeneralModal show={show} setShow={setShow} user={loadedUser} />
          )}
          {showMessage && (
            <MessageModal
              show={true}
              target={profileID}
              setShowMessage={setShowMessage}
              user={loadedUser}
            />
          )}
        </Fragment>
      )}
    </section>
  )
}

const mapState = state => ({
  usersReducer: state.usersReducer
})

export default connect(mapState, { setAvailableUser })(Profile)
