    import { combineReducers } from "redux";
    import amountReducer from "./amountReducer";
    import todoReducer from "./todoReducer";
    import employeeReducer from "./employeeReducer"; // Import the employeeReducer
    import roleReducer from "./roleReducer";
    import permissionReducer from "./permissionReducer";
    import rolePermissionReducer from "./rolePermissionReducer";
    import userReducer from "./userReducer";
    import userPermissionReducer from "./userPermissionReducer";
    import loggedInPermissionReducer from "./loggedInPermissionReducer";

    const reducers = combineReducers({
        amount: amountReducer,
        todos: todoReducer,
        employees: employeeReducer,// Add the employeeReducer under the key 'employees'
        roles: roleReducer,
        permission:  permissionReducer,
        rolePermission: rolePermissionReducer,
        userPermissions:  userPermissionReducer,
        user : userReducer,
        loggedInPermission: loggedInPermissionReducer,
    });

    export default reducers;
