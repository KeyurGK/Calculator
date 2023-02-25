/* eslint-disable default-case */
import React,{useReducer} from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import ClearButton from './ClearButton';
import './App.css';

export const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === '0' && state.currentOperand === '0') return state
      if (payload.digit === '.' && state.currentOperand.includes('.')) return state

      return{
        ...state,
        currentOperand:`${state.currentOperand  || ""}${payload.digit}`
      } 
      case ACTIONS.CHOOSE_OPERATION:
        
        if(state.currentOperand==null){
          return{
            ...state,
            operation:payload.operation
          }
        }
        if(state.currentOperand == null && state.previousOperand == null){
          return state
        }
        if(state.previousOperand == null){
          return{
          ...state,
          operation:payload.operation,
          previousOperand:state.currentOperand,
          currentOperand:null
        }
      }
      return{
        ...state,
        operation:payload.operation,
        previousOperand:evaluate(state),
        currentOperand:null
      }
        
        case ACTIONS.CLEAR:
          return{} 
  }
}

function evaluate({currentOperand,previousOperand,operation}){
const previous = parseFloat(previousOperand)
const current = parseFloat(currentOperand)
if(isNaN(previous) || isNaN(current)) return ''
let computation=''
switch(operation){
  case '+':
    computation = previous + current
    break
  case '-':
    computation = previous - current
    break
  case '*':
    computation = previous * current
    break
  case '÷':
    computation = previous / current
    break
}
return computation.toString()
}




function App() {

  const [{currentOperand,previousOperand,operation},dispatch]=useReducer(
    reducer,
    {}
    )
  return(
 <div className='calculator-grid'>

  <div className='output'>
    <div className='previous-operand'>{previousOperand}{operation}</div>
    <div className='current-operand'>{currentOperand}</div>
  </div>

  {/* <button className='span-two'>AC</button> */}
  <ClearButton dispatch={dispatch} request='AC'/>

  <button>DEL</button>
  <OperationButton dispatch={dispatch} operation='÷'/>
  <DigitButton dispatch={dispatch} digit='1'/>
  <DigitButton dispatch={dispatch} digit='2'/>
  <DigitButton dispatch={dispatch} digit='3'/>
  <OperationButton dispatch={dispatch} operation='*'/>
  <DigitButton dispatch={dispatch} digit='4'/>
  <DigitButton dispatch={dispatch} digit='5'/>
  <DigitButton dispatch={dispatch} digit='6'/>
  <OperationButton dispatch={dispatch} operation='+'/>
  <DigitButton dispatch={dispatch} digit='7'/>
  <DigitButton dispatch={dispatch} digit='8'/>
  <DigitButton dispatch={dispatch} digit='9'/>
  <OperationButton dispatch={dispatch} operation='-'/>
  <DigitButton dispatch={dispatch} digit='.'/> 
  <DigitButton dispatch={dispatch} digit='0'/> 
  <button className='span-two'>=</button>
  

 </div>
  )
}

export default App;
