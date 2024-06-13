import React from 'react'
import { useSelector } from 'react-redux'
import AmountCount from './AmountCount'

const AmountDisplay = () => {
    const amount = useSelector(state=> state.amount)
  return (
    <div>
    <div>AmounT Balance : {amount}</div>
    <AmountCount/>
    </div>

    
  )
}
export default AmountDisplay
