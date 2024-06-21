import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { assignRolesToUser } from '../../Redux/Action/userPermissionAction';
import { getAllRoles } from '../../Redux/Action/roleAction';
import { getAllUsersWithRoleUser } from '../../Redux/Action/userAction';
import { fetchUserPermissions, deleteUserPermissionById } from '../../Redux/Action/userPermissionAction';

const { Option } = Select;

const AssignRolesForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users) || []; // Assuming your users reducer is in state.user.users
  const roles = useSelector(state => state.roles.roles) || []; // Assuming your roles reducer is in state.roles.roles

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  console.log('user', users);
  console.log('roles', roles);

  useEffect(() => {
    dispatch(getAllUsersWithRoleUser());
    dispatch(getAllRoles());
  }, [dispatch]);
  

  const handleSubmit = async () => {
    try {
      const result = await dispatch(assignRolesToUser(selectedUser, selectedRoles));
  
      if (result.success) {
        // Perform actions on success
        console.log('result1', result);
        message.success('User Role Permissions assigned to role successfully');
        onCancel(); // Close the modal on success
      } else {
        // Perform actions on failure
        console.log('result2', result);
        message.error(result.error);
      }
  
      // After roles are assigned successfully, fetch user permissions
      dispatch(fetchUserPermissions());
      onCancel();
    } catch (error) {
      message.error('Already assigned Role Permission');
    }
  };
  return (
    <Form layout="vertical">
      <Form.Item label="User">
        <Select
          placeholder="Select a user"
          onChange={value => setSelectedUser(value)}
        >
          {users.map(user => (
            <Option key={user._id} value={user._id}>
              {user.userName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Roles">
        <Select
          mode="multiple"
          placeholder="Select roles"
          onChange={values => setSelectedRoles(values)}
        >
          {roles.map(role => (
            <Option key={role._id} value={role._id}>
              {role.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>Assign Roles</Button>
      </Form.Item>
    </Form>
  );
};

export default AssignRolesForm;
