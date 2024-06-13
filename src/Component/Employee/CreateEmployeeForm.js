import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux'; // Updated import
import { createEmployee } from '../../Redux/Action/employeeAction'; // Updated import
import { useAuthContext } from '../../Hook/useAuthContext';

const CreateEmployeeForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading); // Get loading state from Redux store
  const { user } = useAuthContext();

  const onFinish = async (formValues) => {
    try {
      dispatch(createEmployee(formValues,user.token)); // Dispatch create employee action
      message.success('Employee created successfully');
    } catch (error) {
      console.error('Error creating employee:', error.message);
      message.error(error.message || 'Failed to create employee');
    }
  };

  return (
    <Form
      name="createEmployee"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please enter the name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="position"
        label="Position"
        rules={[
          {
            required: true,
            message: 'Please enter the position',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="department"
        label="Department"
        rules={[
          {
            required: true,
            message: 'Please enter the department',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="salary"
        label="Salary"
        rules={[
          {
            required: true,
            message: 'Please enter the salary',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateEmployeeForm;
