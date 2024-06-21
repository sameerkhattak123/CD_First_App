

export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const CREATE_PERMISSION = 'CREATE_PERMISSION';
export const GET_ALL_PERMISSIONS = 'GET_ALL_PERMISSIONS';



// Action creators
export const setPermissions = (permissions) => ({
  type: SET_PERMISSIONS,
  payload: permissions
});

export const createPermission = (permission) => ({
  type: CREATE_PERMISSION,
  payload: permission
});

export const getAllPermissions = (permissions) => ({
  type: GET_ALL_PERMISSIONS,
  payload: permissions
});

// Thunk action creators
export const fetchPermissions = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:4000/api/permission/');
      if (!response.ok) {
        throw new Error('Failed to fetch permissions');
      }
      const data = await response.json();
      dispatch(setPermissions(data));
    } catch (error) {
      console.error('Error fetching permissions:', error);
      // Handle error
    }
  };
};

export const addPermission = (permissionData) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:4000/api/permission/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(permissionData),
        });
  
        if (!response.ok) {
          // If the response status is not in the range 200-299, it indicates an error
          const errorData = await response.json();
          return { success: false, error: errorData.error || 'Failed to add permission' };
        }
  
        // Permission added successfully
        const data = await response.json();
        dispatch(createPermission(data));
        return { success: true, data };
      } catch (error) {
        // Handle network errors or other exceptions
        return { success: false, error: error.message || 'Failed to add permission' };
      }
    };
  };
  
  


