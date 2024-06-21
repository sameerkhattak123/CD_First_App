export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_FAILURE = 'CREATE_ROLE_FAILURE';
export const GET_ALL_ROLES_SUCCESS = 'GET_ALL_ROLES_SUCCESS';
export const GET_ALL_ROLES_FAILURE = 'GET_ALL_ROLES_FAILURE';

export const createRoleSuccess = (role) => ({
    type: CREATE_ROLE_SUCCESS,
    payload: role,
  });
  
  export const createRoleFailure = (error) => ({
    type: CREATE_ROLE_FAILURE,
    payload: error,
  });
  
  export const getAllRolesSuccess = (roles) => ({
    type: GET_ALL_ROLES_SUCCESS,
    payload: roles,
  });
  
  export const getAllRolesFailure = (error) => ({
    type: GET_ALL_ROLES_FAILURE,
    payload: error,
  });


  export const createRole = (roleName) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:4000/api/role/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roleName }),
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.error || 'Failed to Create Role' };
        }
  
        const data = await response.json();
        dispatch(createRoleSuccess(data.role));
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message || 'Failed to add Role' };
      }
    };
  };
  
  export const getAllRoles = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:4000/api/role');
  
        if (!response.ok) {
          throw new Error('Failed to get all roles');
        }
  
        const data = await response.json();
        dispatch(getAllRolesSuccess(data));
      } catch (error) {
        console.error('Error getting all roles:', error);
        dispatch(getAllRolesFailure(error.message));
      }
    };
  };
  
  