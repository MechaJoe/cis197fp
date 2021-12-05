import React from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'

export default function ReceiptModal(props) {
  const { onHide } = props
  const [spending, setSpending] = React.useState(0)
  const handleSubmit = async e => {
    const { data: result } = await axios.post('/add', { spending })
    if (result !== 'Receipt processed') {
      alert('Error: Receipt not processed. Double-check all inputs.')
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
          Add a new receipt
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formQuestionText">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Total Amount"
              value={spending}
              onChange={e => setSpending(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Number of People Paying"
              value={spending}
              onChange={e => setSpending(e.target.value)}
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
