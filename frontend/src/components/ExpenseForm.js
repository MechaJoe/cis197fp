import React from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'

export default function ExpenseForm(props) {
  const { expense, payers } = props
  const peopleArr = [...Array(payers).keys()]
  const [checkedState, setCheckedState] = React.useState(
    new Array(peopleArr.length).fill(false),
  )

  const handleOnChange = position => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item))
    setCheckedState(updatedCheckedState)
  }

  return (
    <>
      <p>
        Expense:
        {' '}
        {expense}
      </p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {peopleArr.map((person, index) => (
            <Form.Check
              type="checkbox"
              label={`Payer ${person}`}
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
            />
          ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}
