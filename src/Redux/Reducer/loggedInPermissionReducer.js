// In loggedInPermissionReducer.js

import {
    FETCH_LOGGED_IN_PERMISSIONS_REQUEST,
    FETCH_LOGGED_IN_PERMISSIONS_SUCCESS,
    FETCH_LOGGED_IN_PERMISSIONS_FAILURE
  } from '../Action/loggedInPermissionAction';
  
  const initialState = {
    loggedInPermissions: [],
    loading: false,
    error: null
  };
  
  const loggedInPermissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LOGGED_IN_PERMISSIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_LOGGED_IN_PERMISSIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          loggedInPermissions: action.payload,
          error: null
        };
      case FETCH_LOGGED_IN_PERMISSIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default loggedInPermissionReducer;