// ActionTypes

import { ASSIGN_ROLES_SUCCESS, ASSIGN_ROLES_FAILURE, FETCH_USER_PERMISSIONS_SUCCESS ,FETCH_USER_PERMISSIONS_FAILURE, DELETE_USER_PERMISSION_SUCCESS,
    DELETE_USER_PERMISSION_FAILURE
} from '../Action/userPermissionAction';


// Initial state
const initialState = {
  assignedRoles: [],
  userPermissions: [],
  permission:null,
  error: null
};

// Reducer function
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_ROLES_SUCCESS:
      return {
        ...state,
        userPermissions: [...state.userPermissions,action.payload],
        error: null,
      };
    case ASSIGN_ROLES_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_USER_PERMISSIONS_SUCCESS:
      return {
        ...state,
        userPermissions: action.payload,
        error: null
      };
    case FETCH_USER_PERMISSIONS_FAILURE:
      return {
        ...state,
        error: action.payload
      };

      case DELETE_USER_PERMISSION_SUCCESS:
        
        return {
          ...state,
          userPermissions: state.userPermissions.filter(permission => permission.userPermissionId !== action.payload)
          
         
        };
      
    case DELETE_USER_PERMISSION_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
