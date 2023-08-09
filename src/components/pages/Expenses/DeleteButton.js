import React,{useContext} from 'react'
import ExpenseFormContext from '../../../ContextStore/ExpenseFormContext/ExpenseFormContext';
import axios from 'axios';

function DeleteButton({ serverId}) {
 
 
  const email = localStorage.getItem('email').replace('@', '').replace('.','')
//   const [deleteClicked, setDeleteClicked] = useState(false)
  const {formValuesChanged, updateFormValuesChanged} = useContext(ExpenseFormContext)

  const removeExpenseFromServer=async()=>{
    try{
      const response = await axios.delete(`https://expense-tracker-88b91-default-rtdb.firebaseio.com/${email}/${serverId}.json`)

      console.log(response)
      updateFormValuesChanged(!formValuesChanged)
    }catch(err){
      console.log(err)
    }
  }
//   useEffect(()=>{
    
//     if(deleteClicked){
//       removeExpenseFromServer()
//     }
   
//   },[deleteClicked])
  return <button onClick={
    removeExpenseFromServer
  } className='btn-danger rounded '>Delete</button>
}

export default DeleteButton