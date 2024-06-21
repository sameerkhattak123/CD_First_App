import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { addPermission } from '../../Redux/Action/permissionAction';

const AddPermissionForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await dispatch(addPermission({ permissionName: values.permissionName }));
      if (result.success) {
        message.success('Permission added successfully');
        form.resetFields();
      } else {
        message.error(result.error);
        form.resetFields();
      }
    } catch (error) {
      message.error('Unexpected error occurred');
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Permission Name"
        name="permissionName"
        rules={[{ required: true, message: 'Please input the permission name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Permission
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPermissionForm;
