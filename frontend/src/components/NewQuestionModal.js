import React from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'

export default function NewQuestionModal(props) {
  const { onHide } = props
  const [question, setQuestion] = React.useState('')
  const handleSubmit = async e => {
    const { data: result } = await axios.post('/api/questions/add', { questionText: question })
    if (result !== 'Question added') {
      alert('Error: Question not added. Double-check all inputs.')
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
          Ask a question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formQuestionText">
            <Form.Label>Question Text</Form.Label>
            <Form.Control
              type="question"
              placeholder="Your question here..."
              value={question}
              onChange={e => setQuestion(e.target.value)}
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
