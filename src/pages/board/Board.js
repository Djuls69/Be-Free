import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import JobItem from '../../components/job-item/JobItem'
import { jobs } from '../../data/jobs'

const Board = ({ history, usersReducer: { user } }) => {
  if (!user) {
    history.push('/login')
  }

  return (
    <section>
      <h1>Liste des demandes</h1>
      <hr />
      <Button as={Link} to='/job-form' className='mb-4'>
        Créer une demande de collaboration
      </Button>

      {jobs.map(job => (
        <JobItem key={job.id} job={job} />
      ))}
    </section>
  )
}

const mapState = state => ({
  usersReducer: state.usersReducer
})

export default connect(mapState)(Board)
