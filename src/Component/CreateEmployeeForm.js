import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuthContext } from '../Hook/useAuthContext';

const CreateEmployeeForm = ({ onSuccess }) => { 
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm(); 
    const { user } = useAuthContext();

    const onFinish = async (formValues) => {
        setLoading(true);
        if (!user) {
            return;
        }
        try {
            const response = await fetch('http://localhost:4000/api/employee/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(formValues),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            message.success('Employee created successfully');
            
            onSuccess(data); 
            form.resetFields();
            setLoading(false);
        } catch (error) {
            console.error('Error creating employee:', error.message);
            message.error(error.message || 'Failed to create employee');
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
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

