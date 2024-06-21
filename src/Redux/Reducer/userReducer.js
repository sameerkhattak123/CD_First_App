export const GET_USERS_WITH_ROLE_USER_REQUEST = 'GET_USERS_WITH_ROLE_USER_REQUEST';
export const GET_USERS_WITH_ROLE_USER_SUCCESS = 'GET_USERS_WITH_ROLE_USER_SUCCESS';
export const GET_USERS_WITH_ROLE_USER_FAILURE = 'GET_USERS_WITH_ROLE_USER_FAILURE';

const initialState = {
    users: [],
    loading: false,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_WITH_ROLE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_USERS_WITH_ROLE_USER_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };
        case GET_USERS_WITH_ROLE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;