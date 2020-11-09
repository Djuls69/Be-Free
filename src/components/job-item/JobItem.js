import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Image, Spinner } from 'react-bootstrap'
import Moment from 'react-moment'

const JobItem = ({ job }) => {
  const { id, user, avatar, title, createdAt, summary, project } = job

  return (
    <Card className='mb-4'>
      <Card.Body>
        <Row>
          <Col xs={2}>
            <Link to={`/profile/${user}`}>
              {!avatar ? (
                <Spinner animation='border' variant='info' />
              ) : (
                <Image
                  style={{ width: '100%', objectFit: 'cover', maxHeight: 100 }}
                  src={avatar}
                  alt='User avatar'
                />
              )}
            </Link>
          </Col>
          <Col xs={10}>
            <Card.Title>
              {title} - Projet{' '}
              {project === 'personnal' ? 'Personnel' : 'Professionnel'}
            </Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              Créé le: <Moment format='DD/MM/YYYY'>{createdAt}</Moment>
            </Card.Subtitle>
            <Card.Text>{summary}</Card.Text>
            <Card.Link
              style={{ color: '#1f9bcf' }}
              as={Link}
              to={`/job-request/${id}`}
            >
              Voir la demande
            </Card.Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default JobItem
