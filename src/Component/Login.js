import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin } from '../Hook/useLogin';
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    width: 400,
    borderRadius: 10,
  },
  formForgot: {
    float: 'right',
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading, success } = useLogin();
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    await login(email, password);
  };

  useEffect(() => {
    if (success) {
      setEmail('');
      setPassword('');
      navigate('/employee')
    }
  }, [success]);

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.header}>Log In</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit} // Corrected typo
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="" style={styles.formForgot}>
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={styles.formButton}
              loading={isLoading} // Add loading state
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
          {error && (
            <Alert message={error} type="error" showIcon />
          )}
          {success && (
            <Alert message="User logged in!" type="success" showIcon />
          )}
        </Form>
      </Card>
    </div>
  );
};

export default Login;
