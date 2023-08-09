import React from "react";
import { useState, useEffect, useContext } from "react";
import ExpenseFormContext from "../../../ContextStore/ExpenseFormContext/ExpenseFormContext";
import axios from "axios";
import ExpenseForm from "./Expenseform/ExpenseForm";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

const Expenses = () => {
  const { formValuesChanged } = useContext(ExpenseFormContext);
  const [fetchedData, setFetchedData] = useState([]);

  const email = localStorage.getItem("email").replace("@", "").replace(".", "");

  useEffect(() => {
    const getExpenses = async () => {
      const fetchedDataFromServer = [];
      try {
        const response = await axios.get(
          `https://expense-tracker-88b91-default-rtdb.firebaseio.com/${email}.json`
        );

        console.log(response.data);
        for (const id in response.data) {
          fetchedDataFromServer.push({
            serverId: id,
            ...response.data[id],
          });
          console.log(id);
        }
      } catch (err) {
        console.log(err);
      }
      // Check if the fetched data has changed before updating the state

      setFetchedData(fetchedDataFromServer);
    };
    getExpenses();
  }, [formValuesChanged, email]);
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
              {fetchedData.map((item) => (
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
      </div>
    </div>
  );
};

export default Expenses;
