import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { createRole } from '../../Redux/Action/roleAction';
import { useDispatch } from 'react-redux';

const AddRoleForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
     const result =  await dispatch(createRole(values.roleName));
     if (result.success) {
        message.success('Role added successfully');
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
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div >
      <Form
      form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Role Name"
          name="roleName"
          rules={[{ required: true, message: 'Please input the role name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Role
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddRoleForm;
