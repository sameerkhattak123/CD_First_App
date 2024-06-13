import { type } from '@testing-library/user-event/dist/type';
import { useAuthContext } from '../../Hook/useAuthContext';
// Action Types
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const GET_EMPLOYEE = 'GET_EMPLOYEE';


// Action Creators
export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  payload: employees
});

export const getEmployee = (employee) => ({
    type: GET_EMPLOYEE,
    payload: employee
})


export const createEmployeeSuccess = (employee) => ({
  type: CREATE_EMPLOYEE,
  payload: employee
});

export const deleteEmployeeSuccess = (employeeId) => ({
  type: DELETE_EMPLOYEE,
  payload: employeeId
});

export const editEmployee = (employee) =>({
    type : UPDATE_EMPLOYEE,
    payload :employee
})



// Thunk Action Creators
export const fetchEmployees = (userToken) => {
  return async (dispatch) => {
    try {
        if (!userToken) {
            // Handle not logged in
            return;
          }
      const response = await fetch('http://localhost:4000/api/employee/', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
     
       dispatch(setEmployees(data)); // Dispatch action to set employees
    } catch (error) {
      console.error('Error fetching employees:', error);
      // Handle error
    }
  };
};

export const createEmployee = (employeeData,userToken) => {
  return async (dispatch) => {
    try {
        if (!userToken) {
            // Handle not logged in
            return;
          }
    
      const response = await fetch('http://localhost:4000/api/employee/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      dispatch(createEmployeeSuccess(data)); // Dispatch action to add new employee
    } catch (error) {
      console.error('Error creating employee:', error.message);
      // Handle error
    }
  };
};

export const deleteEmployee = (employeeId,userToken) => {
  return async (dispatch) => {
    try {
        if (!userToken) {
            // Handle not logged in
            return;
          }
      
      const response = await fetch(`http://localhost:4000/api/employee/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch(deleteEmployeeSuccess(json._id)); // Dispatch action to delete employee
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      // Handle error
    }
  };
};

export const fetchEmployee = (employeeId,userToken) =>{
    return async (dispatch)=>{
        try {
            if(!userToken){
                return;
            }
        const response = await fetch(`http://localhost:4000/api/employee/${employeeId}`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${userToken}`,
            },
        });
        const data = await response.json();
        if(response.ok){
            dispatch(getEmployee(data))
        }
        
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    }
}
export const updateEmployee = (employeeId, updatedData, userToken) => {
    return async (dispatch) => {
      try {
        if (!userToken) {
          return;
        }
        const response = await fetch(`http://localhost:4000/api/employee/${employeeId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(editEmployee(data));
        } else {
          throw new Error(data.error || 'Failed to update employee');
        }
      } catch (error) {
        console.log('Error Updating Employee', error);
      }
    };
  };
  