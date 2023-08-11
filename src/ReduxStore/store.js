import { configureStore } from "@reduxjs/toolkit";
import initialExpenseData from "./Slices/initialExpenseData";

const store = configureStore({
    reducer:{
        expenseData: initialExpenseData,
    }
})
export default store;