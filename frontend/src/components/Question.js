import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function Question(props) {
  const {
    questionText, author, answer, loggedIn, onClick, _id,
  } = props
  return (
    <Card>
      <Card.Header as="h5">
        Question asked by:
        {' '}
        {author}
      </Card.Header>
      <Card.Body>
        <Card.Title>Question</Card.Title>
        <Card.Text>
          {questionText}
        </Card.Text>
        {answer ? (
          <Card.Text>
            Answer:
            {' '}
            {answer}
          </Card.Text>
        ) : null}
        {(!answer && loggedIn) ? <Button onClick={onClick}>Answer</Button> : null}
      </Card.Body>
    </Card>
  )
}
