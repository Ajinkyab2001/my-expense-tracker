import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AuthcontextProvider from './ContextStore/AuthContextProvider';
import ExpenseFormContextProvider from './ContextStore/ExpenseFormContext/ExpenseFormContextProvider';
import EditButtonContextProvider from './ContextStore/EditButtonContext/EditButtonContextProvider';
import { Provider } from 'react-redux';
import store from './ReduxStore/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <AuthcontextProvider>
  <ExpenseFormContextProvider>
  <EditButtonContextProvider>  
    <App />
    </EditButtonContextProvider>

    </ExpenseFormContextProvider>
    </AuthcontextProvider>
    </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

