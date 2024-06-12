import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const ViewEmployeeForm = ({ employee, onClose, user, dispatch }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(employee);
  }, [employee, form]);

  const handleFinish = async (values) => {
    try {
      const response = await fetch(`http://localhost:4000/api/employee/${employee._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      console.log(response)

      const updatedData = await response.json();
      console.log(updatedData);
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: updatedData });
      console.log(updatedData);
      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <Form
      form={form}
      initialValues={employee}
      onFinish={handleFinish}
      layout='vertical'
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
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onClose} style={{ marginLeft: '8px' }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ViewEmployeeForm;
