import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Space, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPermissions, deleteUserPermissionById } from '../../Redux/Action/userPermissionAction'; // Import fetchUserPermissions and deleteUserPermissionById actions
import AddRoleForm from './AddRoleForm';
import AddPermissionForm from './AddPermissionForm';
import AddRolePermissionForm from './AddRolePermissionForm';
import AssignRolesForm from './AssignRoleForm';

const AdminMain = () => {
  const dispatch = useDispatch();
  const userPermissions = useSelector(state => state.userPermissions.userPermissions); // Retrieve user permissions from Redux store

  const [roleVisible, setRoleVisible] = useState(false);
  const [permissionVisible, setPermissionVisible] = useState(false);
  const [rolePermissionVisible, setRolePermissionVisible] = useState(false);
  const [userPermissionVisible, setUserPermissionVisible] = useState(false);
  const [assignRolesVisible, setAssignRolesVisible] = useState(false); // State for AssignRolesForm modal

  useEffect(() => {
    dispatch(fetchUserPermissions());
  }, [dispatch]);

  const showRoleModal = () => {
    setRoleVisible(true);
  };

  const showPermissionModal = () => {
    setPermissionVisible(true);
  };

  const showRolePermissionModal = () => {
    setRolePermissionVisible(true);
  };

  const showUserPermissionModal = () => {
    setUserPermissionVisible(true);
  };

  const showAssignRolesModal = () => {
    setAssignRolesVisible(true);
  };

  const handleRoleCancel = () => {
    setRoleVisible(false);
  };

  const handlePermissionCancel = () => {
    setPermissionVisible(false);
  };

  const handleRolePermissionCancel = () => {
    setRolePermissionVisible(false);
  };

  const handleUserPermissionCancel = () => {
    setUserPermissionVisible(false);
  };

  const handleAssignRolesCancel = () => {
    setAssignRolesVisible(false);
  };

  const handleDeletePermission = (permissionId) => {
    dispatch(deleteUserPermissionById(permissionId))
      .then(() => {
        // After deleting the user permission successfully, fetch user permissions
        dispatch(fetchUserPermissions());
      
      })
      .catch((error) => {
        message.error('Failed to delete user permission: ' + error.message);
      });
  };
  
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure you want to delete this user permission?"
            onConfirm={() => handleDeletePermission(record.userPermissionId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={ <DeleteOutlined type='danger' />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <div>
        <Button type="primary" onClick={showRoleModal}>
          Add Role
        </Button>
        <Button type="primary" onClick={showPermissionModal} style={{ marginLeft: '10px' }}>
          Add Permission
        </Button>
        <Button type="primary" onClick={showRolePermissionModal} style={{ marginLeft: '10px' }}>
          Assign Permissions to Role
        </Button>
        <Button type="primary" onClick={showAssignRolesModal} style={{ marginLeft: '10px' }}>
          Assign Roles to User
        </Button>
      </div>

      <Modal
        title="Add Role"
        visible={roleVisible}
        onCancel={handleRoleCancel}
        footer={null}
      >
        <AddRoleForm onCancel={handleRoleCancel} />
      </Modal>

      <Modal
        title="Add Permission"
        visible={permissionVisible}
        onCancel={handlePermissionCancel}
        footer={null}
      >
        <AddPermissionForm onCancel={handlePermissionCancel} />
      </Modal>

      <Modal
        title="Assign Permissions to Role"
        visible={rolePermissionVisible}
        onCancel={handleRolePermissionCancel}
        footer={null}
      >
        <AddRolePermissionForm onCancel={handleRolePermissionCancel} />
      </Modal>
      <Modal
        title="Assign Role to User"
        visible={assignRolesVisible}
        onCancel={handleAssignRolesCancel}
        footer={null}
      >
      <AssignRolesForm
        onCancel={handleAssignRolesCancel}
      />
       </Modal>
      

      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={userPermissions} />
      </div>
    </div>
  );
};

export default AdminMain;
