import React, { useContext, useEffect, useState } from "react";
import EditButtonContext from "../../../ContextStore/EditButtonContext/EditButtonContext";
import axios from "axios";
import ExpenseFormContext from "../../../ContextStore/ExpenseFormContext/ExpenseFormContext";

function EditButton(props) {
  const email = localStorage.getItem("email").replace("@", "").replace(".", "");
  const { formValuesChanged, updateFormValuesChanged } =
    useContext(ExpenseFormContext);
  const { setValuesObj } = useContext(EditButtonContext);
  //   const [isEditClicked, setIsEditClicked] = useState(false)

  const editButtonClickHandler = async () => {
    setValuesObj(props);

    try {
      const response = await axios.delete(
        `https://expense-tracker-88b91-default-rtdb.firebaseio.com/${email}/${props.serverId}.json`
      );
      updateFormValuesChanged(!formValuesChanged);
    } catch (err) {
      console.log(err);
    }
  };
  //   useEffect(() => {

  //     if(isEditClicked){
  //       editButtonClickHandler()
  //     }

  //   },[isEditClicked])
  return (
    // <button
    //   onClick={() => [
    //     // setIsEditClicked(true)
    //     editButtonClickHandler,
    //   ]}
    //   className="btn-warning rounded"
    // >
    //   Edit
    // </button>

    <button
      onClick={
        // setIsEditClicked(true)
        editButtonClickHandler
      }
      className="btn-warning rounded"
    >
      Edit
    </button>
  );
}

export default EditButton;
