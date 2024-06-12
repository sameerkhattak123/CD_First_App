import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import ToDoList from './Component/ToDoList';
import Increment from './Component/Increment';
import Login from './Component/Login';
import Register from './Component/Register';
import { AuthContextProvider } from './Context/AuthContext';
import { EmployeeContextProvider } from './Context/EmployeeContext';
import Signup from './Component/Signup';
import EmployeeItem from './Component/EmployeeItem';
import ProtectedRoute from './Protected/protectedRoute';
import UnprotectedRoute from './Protected/unProtectedRoute';

const router = createBrowserRouter(
  

  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Increment />} />
      <Route path='/todolist' element={<ToDoList />}  />
      <Route path='/login' element={<UnprotectedRoute element={<Login />} />} />
      <Route path='/register' element={<UnprotectedRoute element={<Signup />} />} />
      <Route path='/employee' element={<ProtectedRoute element={<EmployeeItem />} />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EmployeeContextProvider>
    <RouterProvider router={router}/>
    </EmployeeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
