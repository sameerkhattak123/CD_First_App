    import React from 'react';
    import { Form, Input, Button, Card, message } from 'antd';
    import { UserOutlined, LockOutlined } from '@ant-design/icons';
    import { useSignup } from '../Hook/useSignup';

    const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e0f7fa',
    },
    card: {
        width: 400,
        borderRadius: 10,
    },
    formButton: {
        width: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    };

    const Register = () => {
        const { signup, error, isLoading } = useSignup();

        const onFinish = async (values) => {
            try {
                const formData = {
                    userName: values.userName,
                    email: values.email,
                    password: values.password
                };
                // Call signup function with formData
               const res = await signup(formData.userName, formData.email, formData.password);
                debugger;
                console.log(JSON.stringify(formData));
                message.success('Registration successful');
            } catch (error) {
                debugger
                message.error(error.message || 'Failed to register');
            }
        };

        return (
            <div style={styles.container}>
                <Card style={styles.card}>
                    <div style={styles.header}>Register</div>
                    {error && (
                        <div style={{ marginBottom: '20px', color: 'red', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <Form
                        name="register"
                        className="register-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="userName"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="register-form-button"
                                style={styles.formButton}
                                loading={isLoading}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    };

    export default Register;
