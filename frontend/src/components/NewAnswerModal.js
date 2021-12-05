import React from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'

export default function NewAnswerModal(props) {
  const { onHide, _id } = props
  const [answer, setAnswer] = React.useState('')
  const handleSubmit = async e => {
    const { data: result } = await axios.post('/api/questions/answer', { _id, answer })
    if (result !== 'Answer added') {
      alert('Error: Answer not added')
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Answer a question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formAnswerText">
            <Form.Label>Answer Text</Form.Label>
            <Form.Control
              type="answer"
              placeholder="Answer"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
