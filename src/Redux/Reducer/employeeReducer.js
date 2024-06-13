// reducer.js

import { SET_EMPLOYEES, CREATE_EMPLOYEE, DELETE_EMPLOYEE ,GET_EMPLOYEE, UPDATE_EMPLOYEE} from '../Action/employeeAction';

const initialState = {
  employees: [],
  employee: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    case CREATE_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(employee => employee._id !== action.payload)
      };
    
    case GET_EMPLOYEE:
        return{
            ...state,
            employee: action.payload
        }
    case UPDATE_EMPLOYEE:
        return{
            ...state,
            employees: state.employees.map(employee=>
                employee._id === action.payload._id ? action.payload: employee
            ),
        };
    default:
      return state;
  }
};

export default reducer;
