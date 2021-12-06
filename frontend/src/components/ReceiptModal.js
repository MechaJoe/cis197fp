import React from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function ReceiptModal(props) {
  const { show, onHide } = props
  const [spending, setSpending] = React.useState(0)
  const [payers, setPayers] = React.useState(0)
  const [expenses, setExpenses] = React.useState(0)

  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()
    const { data: data1 } = await axios.post('/spending', { spending })
    const { data: data2 } = await axios.post('/splitting', { payers, expenses })
    if (data1 !== 'receipt processed') {
      alert('Error: Receipt not processed. Double-check all inputs.')
    } else if (data2 !== 'splitting created') {
      alert('Error: Splitting not created. Double-check all inputs.')
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
            <Form.Label>Number of People Paying</Form.Label>
            <Form.Control
              type="number"
              placeholder="Number of People Paying"
              value={payers}
              onChange={e => setPayers(e.target.value)}
            />
            <Form.Label>Number of Expenses</Form.Label>
            <Form.Control
              type="number"
              placeholder="Number of Expenses"
              value={expenses}
              onChange={e => setExpenses(e.target.value)}
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
