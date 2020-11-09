import React, { useState, useEffect } from 'react'
import { db } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Image } from 'react-bootstrap'
import Moment from 'react-moment'

const JobItem = ({ job }) => {
  const { id, user, title, createdAt, summary } = job
  const [creator, setCreator] = useState({ avatar: '', id: '' })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await db.collection('users').doc(user).get()
        if (res) {
          setCreator({
            avatar: res.data().avatar,
            id: res.data().id
          })
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    fetchUser()
  }, [user])

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2}>
            <Link to={`/profile/${creator.id}`}>
              <Image
                style={{ width: '100%', objectFit: 'cover' }}
                src={creator.avatar}
                alt={creator.name}
              />
            </Link>
          </Col>
          <Col xs={10}>
            <Card.Title>{title}</Card.Title>
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
