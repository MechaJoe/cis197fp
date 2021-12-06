import React from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
import ExpenseForm from './ExpenseForm'

export default function Splitter(props) {
  const { payers, expenses } = props
  const expenseArr = new Array(expenses).fill(0)
  const [map, setMap] = React.useState({})
  console.log(expenseArr)
  const [finished, setFinished] = React.useState(false)

  return (
    <>
      <h1>New Bill to Split</h1>
      {expenseArr.map(expense => (
        <ExpenseForm
          key={expense}
          expense={expense}
          payers={payers}
          setMap={setMap}
        />
      ))}
    </>
  )
}
