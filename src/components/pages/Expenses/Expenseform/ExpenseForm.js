import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ExpenseFormContext from "../../../../ContextStore/ExpenseFormContext/ExpenseFormContext";
import EditButtonContext from "../../../../ContextStore/EditButtonContext/EditButtonContext";

const ExpenseForm = () => {
  const { formValuesChanged, updateFormValuesChanged } =
    useContext(ExpenseFormContext);
  const { valuesObj } = useContext(EditButtonContext);
  const [submitClicked, setSubmitClicked] = useState(false);

  const email = localStorage.getItem("email").replace("@", "").replace(".", "");
  const [formValues, setFormValues] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
    debitOrCredit: "",
  });

  const descriptionChangeHandler = (e) => {
    setFormValues((prevObj) => {
      return {
        ...prevObj,
        description: e.target.value,
      };
    });
  };
  const amountChangeHandler = (e) => {
    setFormValues((prevObj) => {
      return {
        ...prevObj,
        amount: e.target.value,
      };
    });
  };
  const dateChangeHandler = (e) => {
    setFormValues((prevObj) => {
      return {
        ...prevObj,
        date: e.target.value,
      };
    });
  };
  const categoryChangeHandler = (e) => {
    setFormValues((prevObj) => {
      return {
        ...prevObj,
        category: e.target.value,
      };
    });
  };
  const debitOrCreditChangeHandler = (e) => {
    setFormValues((prevObj) => {
      return {
        ...prevObj,
        debitOrCredit: e.target.value,
      };
    });
  };

  useEffect(() => {
    const submitHandler = async () => {
      if (!formValues.description.trim()) return;
      const id = new Date().getTime();

      // Add the ID to the form values
      const formValuesWithId = {
        ...formValues,
        id: id,
      };

      try {
        const response = await axios.post(
          `https://expense-tracker-88b91-default-rtdb.firebaseio.com/${email}.json`,
          { ...formValuesWithId }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
      updateFormValuesChanged(!formValuesChanged);

      setFormValues({
        description: "",
        amount: "",
        date: "",
        category: "",
        debitOrCredit: "",
      });
    };
    submitHandler();
  }, [submitClicked]);

  useEffect(() => {
    setFormValues({
      description: valuesObj.expenseObj?.description || "",
      date: valuesObj.expenseObj?.date || "",
      amount: valuesObj.expenseObj?.amount || "",
      debitOrCredit: valuesObj.expenseObj?.debitOrCredit || "",
      category: valuesObj.expenseObj?.category || "",
    });
  }, [valuesObj]);

  return (
    <div className="container-fluid bg-warning parentContainer">
      <div className="text-center pt-5 bg-warning ">
        <h2> Expense Tracker</h2>
        <p>Please fill your expense below...</p>
      </div>

      <div className="card">
        <div className="card-body ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitClicked(!submitClicked);
            }}
            id="bookingForm"
            action="#"
            method=""
            className="needs-validation"
            novalidate
            autoComplete="on"
          >
            <div className="form-group">
              <label for="inputName">Description</label>
              <input
                value={formValues.description}
                onChange={descriptionChangeHandler}
                type="text"
                className="form-control"
                id="inputName"
                name="name"
                placeholder="Description"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label for="inputAmount">Amount</label>
                <input
                  value={formValues.amount}
                  onChange={amountChangeHandler}
                  type="number"
                  className="form-control"
                  id="inputAmount"
                  name="Amount"
                  placeholder="Amount"
                  required
                />
              </div>

              <div className="form-group col-md-4">
                <label for="inputDate">Date</label>
                <input
                  value={formValues.date}
                  onChange={dateChangeHandler}
                  type="date"
                  className="form-control"
                  id="inputDate"
                  name="date"
                  required
                />
              </div>

              <div className="mt-3 form-group col-md-4">
                <label>Category</label>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <select
                    value={formValues.category}
                    onChange={categoryChangeHandler}
                    className="form-control mr-1"
                    id="category"
                    required
                  >
                    {/* <option value="" disabled selected> Expense Category</option> */}
                    <option>Food</option>
                    <option>Shoping</option>
                    <option>Travel</option>
                    <option>Medical Emergency</option>
                    <option>School Expense</option>
                    <option>Other</option>
                  </select>

                  <select
                    value={formValues.debitOrCredit}
                    onChange={debitOrCreditChangeHandler}
                    className="form-control mr-1"
                    id="category"
                    required
                  >
                    <option>Debit</option>
                    <option>Credit</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="btn btn-warning border border-dark btn-block col-lg-3 m-auto"
              type="submit"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
