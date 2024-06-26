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
import ReduxEmployeeItem from './Component/Employee/EmployeeItem';
import ProtectedRoute from './Protected/protectedRoute';
import UnprotectedRoute from './Protected/unProtectedRoute';
import AdminProtectedRoute from './Protected/adminProtectedRoute';

import { Provider } from 'react-redux'
import { store } from './Redux/store';
import AmountDisplay from './Component/AmountDisplay';
import TodoItem from './Component/ToDo/TodoItem';
import TodoList from './Component/ToDo/Todolist';
import AddRoleForm from './Component/Admin/AddRoleForm';
import AdminMain from './Component/Admin/AdminMain';
import Game from './Component/FlappyBird/Game';
import WeatherApp from './Component/Weather/WeatherApp';

const router = createBrowserRouter(
  

  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Increment />} />
      <Route path='/todolist' element={<ToDoList />}  />
      <Route path='/game' element={<Game/>}  />
      <Route path='/weather' element={<WeatherApp/>}  />
      <Route path='/reduxtodolist' element={<TodoList />}   />
      <Route path='/login' element={<UnprotectedRoute element={<Login />} />} />
      <Route path='/amountwithdraw' element={<AmountDisplay />}  />
      <Route path='/register' element={<UnprotectedRoute element={<Signup />} />} />
      <Route path='/employee' element={<ProtectedRoute element={<EmployeeItem />} />} />
      <Route path='/admin' element={<AdminProtectedRoute element={<AdminMain />} />} />
      <Route path='/reduxemployee' element={<ProtectedRoute element={<ReduxEmployeeItem />} />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider>
      <EmployeeContextProvider>
    <RouterProvider router={router}/>
    </EmployeeContextProvider>
    </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
