import { combineReducers } from "redux";
import amountReducer from "./amountReducer";
import todoReducer from "./todoReducer";
import employeeReducer from "./employeeReducer"; // Import the employeeReducer

const reducers = combineReducers({
    amount: amountReducer,
    todos: todoReducer,
    employees: employeeReducer // Add the employeeReducer under the key 'employees'
});

export default reducers;
