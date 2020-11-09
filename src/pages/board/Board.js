import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { fetchAdverts } from '../../redux/actions/advertsActions'
import { connect } from 'react-redux'
import JobItem from '../../components/job-item/JobItem'

const Board = ({ history, user, advertsReducer, fetchAdverts }) => {
  if (!user) {
    history.push('/login')
  }

  const { loading, adverts } = advertsReducer

  useEffect(() => {
    fetchAdverts()
  }, [fetchAdverts])
  return (
    <section>
      <h1>Liste des demandes</h1>
      <hr />
      <Button as={Link} to='/job-form' className='mb-4'>
        Créer une demande de collaboration
      </Button>

      {loading ? (
        <h4>Loading...</h4>
      ) : (
        adverts.map(job => <JobItem key={job.id} job={job} />)
      )}
    </section>
  )
}

const mapState = state => ({
  user: state.usersReducer.user,
  advertsReducer: state.advertsReducer
})

export default connect(mapState, { fetchAdverts })(Board)
