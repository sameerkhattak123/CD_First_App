export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const CREATE_PERMISSION = 'CREATE_PERMISSION';
export const GET_ALL_PERMISSIONS = 'GET_ALL_PERMISSIONS';


const initialState = {
    permissions: [],
  };
  
  const permissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_PERMISSIONS:
        return {
          ...state,
          permissions: action.payload
        };
      case CREATE_PERMISSION:
        return {
          ...state,
          permissions: [...state.permissions, action.payload]
        };
      case GET_ALL_PERMISSIONS:
        return {
          ...state,
          permissions: action.payload
        };
      default:
        return state;
    }
  };
  
  export default permissionReducer;