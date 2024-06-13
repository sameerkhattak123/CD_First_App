import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '../../Redux/Action/employeeAction';
import { useAuthContext } from '../../Hook/useAuthContext';

const ViewEmployeeForm = ({ employee, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  useEffect(() => {
    form.setFieldsValue(employee);
  }, [employee, form]);

  const handleFinish = async (values) => {
    dispatch(updateEmployee(employee._id, values, user.token));
    onClose();
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
        <Input type="number" />
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
