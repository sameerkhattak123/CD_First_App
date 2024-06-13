import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux/index';

function AmountCount() {
    const dispatch = useDispatch();
  return (
    <div>
        <h2>Withdraw Money</h2>
        <button onClick={()=>(dispatch(actionCreators.withdrawMoney(50)))}>-</button>
        Update Balance
        <button onClick={()=>(dispatch(actionCreators.depositMoney(50)))}>+</button>
    </div>
  )
}

export default AmountCount