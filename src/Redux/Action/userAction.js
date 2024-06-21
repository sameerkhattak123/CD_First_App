export const GET_USERS_WITH_ROLE_USER_REQUEST = 'GET_USERS_WITH_ROLE_USER_REQUEST';
export const GET_USERS_WITH_ROLE_USER_SUCCESS = 'GET_USERS_WITH_ROLE_USER_SUCCESS';
export const GET_USERS_WITH_ROLE_USER_FAILURE = 'GET_USERS_WITH_ROLE_USER_FAILURE';

// In userActions.js

export const getAllUsersWithRoleUser = () => {
    return async (dispatch) => {
        dispatch({type:GET_USERS_WITH_ROLE_USER_REQUEST});
        try {
            const response = await fetch('http://localhost:4000/api/user/',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to get users with role user');
            }

            const data = await response.json();
            console.log('testing',data)
            dispatch({type: GET_USERS_WITH_ROLE_USER_SUCCESS,payload :data});
        } catch (error) {
            console.error('Error getting users with role user:', error);
            dispatch({type:GET_USERS_WITH_ROLE_USER_FAILURE, payload: error.message});
        }
    };
};