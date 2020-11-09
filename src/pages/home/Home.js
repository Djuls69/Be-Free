import React, { useEffect } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import {
  getAllProfiles,
  getAllDevs,
  getAllDesigners
} from '../../redux/actions/profilesActions'
import { connect } from 'react-redux'
import DevThumbnail from '../../components/dev-thumbnail/DevThumbnail'

const Home = ({
  allProfilesReducer,
  getAllProfiles,
  getAllDevs,
  getAllDesigners
}) => {
  const { loading, profiles } = allProfilesReducer

  useEffect(() => {
    getAllProfiles()
  }, [getAllProfiles])

  return (
    <section>
      <h1>Liste de nos membres</h1>
      <hr />

      <span className='mr-2'>Filtrer par:</span>
      <Button variant='secondary' onClick={getAllProfiles} className='mr-4'>
        Tous les utilisateurs
      </Button>
      <Button variant='secondary' onClick={getAllDevs} className='mr-4'>
        Développeurs
      </Button>
      <Button variant='secondary' onClick={getAllDesigners} className='mr-4'>
        Designers
      </Button>

      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <Row style={{ marginTop: 60 }}>
          {profiles.map(dev => (
            <Col key={dev.id} xs={12} sm={6} md={3}>
              <DevThumbnail dev={dev} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}

const mapState = state => ({
  allProfilesReducer: state.allProfilesReducer
})

export default connect(mapState, {
  getAllProfiles,
  getAllDevs,
  getAllDesigners
})(Home)
