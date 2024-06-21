import React, { useEffect, useState } from 'react';
import { Form, Select, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../Redux/Action/roleAction';
import { fetchPermissions } from '../../Redux/Action/permissionAction';
import { assignPermissionsToRole } from '../../Redux/Action/rolePermissionAction';

const { Option } = Select;

const AddRolePermissionForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const roles = useSelector((state) => state.roles.roles);
  const permissions = useSelector((state) => state.permission.permissions);


  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  const onFinish = async (values) => {
    setLoading(true);
    const { roleId, permissionIds } = values;

    try {
      const result = await dispatch(assignPermissionsToRole(roleId, permissionIds));
      if (result.success) {
        message.success('Permissions assigned to role successfully');
        form.resetFields();
        onCancel(); // Close the modal on success
      } else {
        message.error(result.error);
      }
    } catch (error) {
      message.error('Failed to assign permissions');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="assign-role-permission"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Role"
        name="roleId"
        rules={[{ required: true, message: 'Please select a role!' }]}
      >
        <Select placeholder="Select a role">
          {roles.map((role) => (
            <Option key={role._id} value={role._id}>
              {role.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Permissions"
        name="permissionIds"
        rules={[{ required: true, message: 'Please select permissions!' }]}
      >
        <Select mode="multiple" placeholder="Select permissions">
          {permissions.map((permission) => (
            <Option key={permission._id} value={permission._id}>
              {permission.permissionName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Assign Permissions
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddRolePermissionForm;
