import { createContext, useReducer } from "react";

export const EmployeeContext   = createContext()

export const employeesReducer = (state, action) =>{
    
    switch(action.type){
        case 'SET_EMPLOYEES':
            return{

                employees:action.payload
            }
        case 'CREATE_EMPLOYEE':
            return{

                employees: [action.payload, ...state.employees]
            }
        case 'UPDATE_EMPLOYEE':
                return {
                  employees: state.employees.map((e) => (e._id === action.payload._id ? action.payload : e))
                };
        case 'DELETE_EMPLOYEE':
            return{
                employees: state.employees.filter((e)=>e._id !== action.payload._id)
            }
        case 'GET_EMPLOYEE_BY_ID':
                // Assuming you have a function to fetch employee by ID
                const employee = state.employees.find(e => e._id === action.payload);
                return {
                  ...state,
                  employees: employee 
                };
        default:
            return state
    }

}

export const EmployeeContextProvider = ({children}) =>{

    const [state,dispatch] = useReducer(employeesReducer,{
        employees:null
    })
    

    return(
        <EmployeeContext.Provider  value={{...state, dispatch}}>
                { children }
        </EmployeeContext.Provider>
    )
}