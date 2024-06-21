import {
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_FAILURE,
    GET_ALL_ROLES_SUCCESS,
    GET_ALL_ROLES_FAILURE,
  } from '../Action/roleAction';
  
  const initialState = {
    roles: [],
    error: null,
  };
  
  const roleReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ROLE_SUCCESS:
        return {
          ...state,
          roles: [...state.roles, action.payload],
          error: null,
        };
      case CREATE_ROLE_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case GET_ALL_ROLES_SUCCESS:
        return {
          ...state,
          roles: action.payload,
          error: null,
        };
      case GET_ALL_ROLES_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default roleReducer;
  