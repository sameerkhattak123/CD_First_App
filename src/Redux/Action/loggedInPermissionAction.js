// In loggedInPermissionActionTypes.js

export const FETCH_LOGGED_IN_PERMISSIONS_REQUEST = 'FETCH_LOGGED_IN_PERMISSIONS_REQUEST';
export const FETCH_LOGGED_IN_PERMISSIONS_SUCCESS = 'FETCH_LOGGED_IN_PERMISSIONS_SUCCESS';
export const FETCH_LOGGED_IN_PERMISSIONS_FAILURE = 'FETCH_LOGGED_IN_PERMISSIONS_FAILURE';


export const fetchLoggedInPermissionsRequest = () => ({
    type: FETCH_LOGGED_IN_PERMISSIONS_REQUEST
  });
  
  export const fetchLoggedInPermissionsSuccess = (loggedInPermissions) => ({
    type: FETCH_LOGGED_IN_PERMISSIONS_SUCCESS,
    payload: loggedInPermissions
  });
  
  export const fetchLoggedInPermissionsFailure = (error) => ({
    type: FETCH_LOGGED_IN_PERMISSIONS_FAILURE,
    payload: error
  });
  

  export const fetchLoggedInPermissions = (userToken) => {
    return async (dispatch) => {
      dispatch(fetchLoggedInPermissionsRequest());
      try {
        if (!userToken) {
            // Handle not logged in
            return;
          }
        const response = await fetch('http://localhost:4000/api/user-permission/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`, // Assuming you're using JWT for authentication
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          dispatch(fetchLoggedInPermissionsSuccess(data));
          
        } else {
          const errorData = await response.json();
          dispatch(fetchLoggedInPermissionsFailure(errorData.error || 'Failed to fetch role permissions'));
        }
      } catch (error) {
        dispatch(fetchLoggedInPermissionsFailure('Failed to fetch role permissions'));
      }
    };
  };