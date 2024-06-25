

// ActionTypes
export const ASSIGN_ROLES_SUCCESS = 'ASSIGN_ROLES_SUCCESS';
export const ASSIGN_ROLES_FAILURE = 'ASSIGN_ROLES_FAILURE';
export const FETCH_USER_PERMISSIONS_SUCCESS = 'FETCH_USER_PERMISSIONS_SUCCESS';
export const FETCH_USER_PERMISSIONS_FAILURE = 'FETCH_USER_PERMISSIONS_FAILURE';
export const DELETE_USER_PERMISSION_SUCCESS = 'DELETE_USER_PERMISSION_SUCCESS';
export const DELETE_USER_PERMISSION_FAILURE = 'DELETE_USER_PERMISSION_FAILURE';

// ActionCreators
export const assignRolesToUserSuccess = (data) => ({
  type: ASSIGN_ROLES_SUCCESS,
  payload: data,
});

export const assignRolesToUserFailure = (error) => ({
  type: ASSIGN_ROLES_FAILURE,
  payload: error
});

export const fetchUserPermissionsSuccess = (permissions) => ({
  type: FETCH_USER_PERMISSIONS_SUCCESS,
  payload: permissions
});

export const fetchUserPermissionsFailure = (error) => ({
  type: FETCH_USER_PERMISSIONS_FAILURE,
  payload: error
});

export const deleteUserPermissionSuccess = (permissionId) => ({
    type: DELETE_USER_PERMISSION_SUCCESS,
    payload: permissionId
  });
export const deleteUserPermissionFailure = (error) => ({
  type: DELETE_USER_PERMISSION_FAILURE,
  payload: error
});

// ThunkActionCreators
export const assignRolesToUser = (userId, roleIds) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:4000/api/user-permission/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, roleIds })
      });
      console.log('res',response)
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Already assigned Role Permission' };
      }

      const data = await response.json();
      console.log('datas',data)
      dispatch(assignRolesToUserSuccess(data));
      return { success: true, data };
    } catch (error) {
      dispatch(assignRolesToUserFailure(error.message));
      return { success: false, error: error.message || 'Already assigned Role Permission' };
    }
  };
};

export const fetchUserPermissions = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:4000/api/user-permission/userpermissiondetails');

      if (response.ok) {
        const data = await response.json();
        console.log('data',data)
        dispatch(fetchUserPermissionsSuccess(data));
      } else {
        throw new Error('Failed to fetch user permissions');
      }
    } catch (error) {
      dispatch(fetchUserPermissionsFailure(error.message));
    }
  };
};

export const deleteUserPermissionById = (permissionId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user-permission/${permissionId}`, {
        method: 'DELETE'
      });
      const json = await response.json();
     

      if (response.ok) {
        dispatch(deleteUserPermissionSuccess(json._id));
        dispatch(fetchUserPermissionsSuccess())
      } else {
        throw new Error('Failed to delete user permission');
      }
    } catch (error) {
      dispatch(deleteUserPermissionFailure(error.message));
    }
  };
};
