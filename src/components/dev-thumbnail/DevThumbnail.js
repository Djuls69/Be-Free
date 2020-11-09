import React from 'react'
import './DevThumbnail.css'
import { Link } from 'react-router-dom'
import { Card, Badge } from 'react-bootstrap'
import AvailableItem from '../available-item/AvailableItem'

const DevThumbnail = ({ dev }) => {
  const { id, avatar, firstName, lastName, title, skills } = dev

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
          {skills.length > 0 && (
            <Card.Text>
              {skills
                .filter((_, idx) => idx < 8)
                .map((skill, idx) => (
                  <Badge pill variant='info' className='mr-2' key={idx}>
                    {skill}
                  </Badge>
                ))}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </Link>
  )
}

export default DevThumbnail
