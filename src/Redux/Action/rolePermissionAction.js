import { message } from 'antd';

// Action Types
export const ASSIGN_PERMISSIONS_TO_ROLE = 'ASSIGN_PERMISSIONS_TO_ROLE';
export const GET_ALL_ROLE_PERMISSIONS = 'GET_ALL_ROLE_PERMISSIONS';
export const GET_ROLE_PERMISSIONS = 'GET_ROLE_PERMISSIONS';

// Action Creators
export const assignPermissionsToRole = (roleId, permissionIds) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:4000/api/role-permission/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roleId, permissionIds }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { success: false, error: errorData.error || 'Failed to assign permissions' };
            }

            const data = await response.json();
            dispatch({ type: ASSIGN_PERMISSIONS_TO_ROLE, payload: data });
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message || 'Failed to assign permissions' };
        }
    };
};

export const getAllRolePermissions = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:4000/api/role-permission/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { success: false, error: errorData.error || 'Failed to fetch role permissions' };
            }

            const data = await response.json();
            dispatch({ type: GET_ALL_ROLE_PERMISSIONS, payload: data });
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message || 'Failed to fetch role permissions' };
        }
    };
};

export const getRolePermissions = (roleId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:4000/api/role-permission/${roleId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { success: false, error: errorData.error || 'Failed to fetch role permissions' };
            }

            const data = await response.json();
            dispatch({ type: GET_ROLE_PERMISSIONS, payload: data });
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message || 'Failed to fetch role permissions' };
        }
    };
};
