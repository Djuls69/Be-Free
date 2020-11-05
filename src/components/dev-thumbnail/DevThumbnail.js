import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import AvailableItem from '../available-item/AvailableItem'

const DevThumbnail = ({ dev }) => {
  const { id, avatar, firstName, lastName, title } = dev

  return (
    <Link to={`/profile/${id}`}>
      <Card style={{ position: 'relative' }}>
        <Card.Img
          style={{ height: 200, objectFit: 'cover' }}
          variant='top'
          src={avatar}
        />
        <AvailableItem available={dev.available} />
        <Card.Body>
          <Card.Title>
            {firstName} {lastName}
          </Card.Title>
          <Card.Text>{title}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default DevThumbnail
