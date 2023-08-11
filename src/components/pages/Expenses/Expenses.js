import React from "react";
import { useState, useEffect, useContext } from "react";
import ExpenseFormContext from "../../../ContextStore/ExpenseFormContext/ExpenseFormContext";
// import axios from "axios";
import ExpenseForm from "./Expenseform/ExpenseForm";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import { useDispatch, useSelector } from "react-redux";
import {fetchDataFromServer} from '../../../ReduxStore/Slices/initialExpenseData'
import { saveAs } from "file-saver";


const Expenses = () => {
  const [credit,setCredit] = useState(0)
  const [debit,setDebit] = useState(0)
  const { formValuesChanged } = useContext(ExpenseFormContext);
  // const [fetchedData, setFetchedData] = useState([]);
  const dispatch = useDispatch()
  const {data} = useSelector((state)=>state.expenseData)
  const email = localStorage.getItem("email").replace("@", "").replace(".", "");
 
  useEffect(()=>{
    let dataCredit = 0;
    let dataDebit = 0;
    for(let i = 0; i<data.length; i++){

        if(data[i].debitOrCredit === 'Credit') dataCredit += Number.parseInt(data[i].amount)
        if(data[i].debitOrCredit === 'Debit') dataDebit += Number.parseInt(data[i].amount)
        console.log(typeof data[i].amount  )
        console.log(typeof dataCredit  )
    }
    setCredit(dataCredit)
    setDebit(dataDebit)
   },[data])


  useEffect(() => {
    // const getExpenses = async () => {
    //   // const fetchedDataFromServer = [];
    //   // try {
    //   //   const response = await axios.get(
    //   //     `https://expense-tracker-88b91-default-rtdb.firebaseio.com/${email}.json`
    //   //   );

    //   //   console.log(response.data);
    //   //   for (const id in response.data) {
    //   //     fetchedDataFromServer.push({
    //   //       serverId: id,
    //   //       ...response.data[id],
    //   //     });
    //   //     console.log(id);
    //   //   }
    //   // } catch (err) {
    //   //   console.log(err);
    //   // }
    //   // Check if the fetched data has changed before updating the state

    //   // setFetchedData(fetchedDataFromServer);
    // };
    // getExpenses();
        dispatch(fetchDataFromServer())
  }, [formValuesChanged, email]);

  //download expense logic
  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    return [header, ...rows].join("\n");
  };
  const handleDownload = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "expenses.csv");
  };
    //end
  return (
    <div className="parent p-3">
      <div className="">
        <ExpenseForm />
      </div>

      <div
        className="container bg-warning mt-3 mb-5  p-3 "
        style={{ borderRadius: "0.5rem" }}
      >
        <h2 className="text-dark fw-bold">Expense Table</h2>
        <div class="table-wrapper">
          <table class="fl-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Catagory</th>
                <th>Credit/Debit</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <ExpenseItem
                  key={item.id}
                  serverId={item.serverId}
                  id={item.id}
                  description={item.description}
                  amount={item.amount}
                  date={item.date}
                  debitOrCredit={item.debitOrCredit}
                  category={item.category}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className={` border  rounded   shadow w-25 d-flex flex-column align-items-center p-2 justify-content-center ${darkMode?darkStyle + 'border-warning':'border-dark'}`} style={{height:'14rem',boxShadow:'0px 35px 50px rgba( 0, 0, 0, 0.2 )'}}> */}
             <div>
                
                    <h5>Realtime Expense </h5>
                    
                    <span className='text-danger fw-bold h5 mt-1'>Debit ₹{debit}</span><br/>
                    <span className='text-success fw-bold h5 mt-1'>Credit ₹{credit}</span>
                    
                    <hr className='bg-danger w-100 mt-0'/>
                    <span className={` fw-bold h5 ${credit - debit <= 0? 'text-danger':'text-success'}`}>Total ₹{debit - credit}</span><br/>
                    <button onClick={handleDownload} className='btn btn-primary mt-3'>Download Expenses</button>
                </div>
      </div>
    </div>
  );
};

export default Expenses;
