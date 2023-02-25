import React from 'react'
import './App.css';
import { ACTIONS } from './App'

export default function ClearButton({dispatch,request}) {
  return (
    <button onClick={()=>dispatch({type:ACTIONS.CLEAR,payload:request})

    } className='span-two'>{request}</button>
  )
}
