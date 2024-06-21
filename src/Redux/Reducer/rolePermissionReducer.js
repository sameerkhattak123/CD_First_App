import { ASSIGN_PERMISSIONS_TO_ROLE, GET_ALL_ROLE_PERMISSIONS, GET_ROLE_PERMISSIONS } from '../Action/rolePermissionAction';

const initialState = {
    rolePermissions: [],
    rolePermissionAssignment: null,
    error: null,
};

const rolePermissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ASSIGN_PERMISSIONS_TO_ROLE:
            return {
                ...state,
                rolePermissionAssignment: action.payload,
                error: null,
            };
        case GET_ALL_ROLE_PERMISSIONS:
            return {
                ...state,
                rolePermissions: action.payload,
                error: null,
            };
        case GET_ROLE_PERMISSIONS:
            return {
                ...state,
                rolePermissions: action.payload,
                error: null,
            };
        default:
            return state;
    }
};

export default rolePermissionReducer;
