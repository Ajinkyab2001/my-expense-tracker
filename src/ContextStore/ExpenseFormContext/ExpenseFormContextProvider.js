import React,{useState} from 'react'
import ExpenseFormContext from './ExpenseFormContext';


function ExpenseFormContextProvider(props) {

    const [formValuesChanged,updateFormValuesChanged] = useState(false);

   
  return (
    <ExpenseFormContext.Provider value={{formValuesChanged,updateFormValuesChanged}}>{props.children}</ExpenseFormContext.Provider>
  )
}

export default ExpenseFormContextProvider