import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { getAllProfiles } from '../../redux/actions/profilesActions'
import { connect } from 'react-redux'
import DevThumbnail from '../../components/dev-thumbnail/DevThumbnail'

const Home = ({ allProfilesReducer, getAllProfiles }) => {
  const { loading, profiles } = allProfilesReducer

  useEffect(() => {
    getAllProfiles()
  }, [getAllProfiles])

  return (
    <section>
      <h1>Liste de nos brillants développeurs</h1>
      <hr />

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

export default connect(mapState, { getAllProfiles })(Home)
