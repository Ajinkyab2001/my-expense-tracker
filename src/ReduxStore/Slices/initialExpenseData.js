import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const email = localStorage.getItem('email').replace('@','').replace('.','')
export const  STATUSES = Object.freeze({
    SUCCESS:'SUCCESS',
        ERROR:'error',
        LOADING:'LOADING'
})

const initialExpenseData = createSlice({
    name:'expenseData',
    initialState:{
        data:[],
        status:STATUSES.SUCCESS
    },
    reducers:{
        fetchData(state,action){
            state.data = action.payload;
        },
        setStatus(state,action){
            state.status = action.payload;
        }
    }
})
export const {fetchData,setStatus} = initialExpenseData.actions;
export default initialExpenseData.reducer


export function fetchDataFromServer(){
    return async function getProductsThunk(dispatch,getState){
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
      dispatch(fetchData(fetchedDataFromServer))
    console.log(fetchedDataFromServer)
    }
}