import { useState, useEffect } from "react";
import { useSignup } from "../Hook/useSignup";
import { Form, Input, Button, Typography, Alert, Card, Row, Col } from 'antd';

const { Title } = Typography;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const { signup, error, isLoading, success } = useSignup();

  const handleSubmit = async () => {
    await signup(userName, email, password);
  };

  useEffect(() => {
    if (success) {
      setEmail('');
      setPassword('');
      setUserName('');
    }
  }, [success]);

  const styles = {
    row: {
      minHeight: '100vh',
      background: '#f0f2f5',
    },
    card: {
      padding: '24px',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '24px',
    },
    formItem: {
      marginBottom: '16px',
    },
    input: {
      borderRadius: '4px',
    },
    button: {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
      borderRadius: '4px',
      height: '40px',
      fontSize: '16px',
    },
    buttonHover: {
      backgroundColor: '#40a9ff',
      borderColor: '#40a9ff',
    }
  };

  return (
    <Row justify="center" align="middle" style={styles.row}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card style={styles.card}>
          <Form className="signup" onFinish={handleSubmit} layout="vertical">
            <Title level={3} style={styles.title}>Sign Up</Title>

            <Form.Item label="User Name" required style={styles.formItem}>
              <Input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                style={styles.input}
              />
            </Form.Item>

            <Form.Item label="Email Address" required style={styles.formItem}>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={styles.input}
              />
            </Form.Item>

            <Form.Item label="Password" required style={styles.formItem}>
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={styles.input}
              />
            </Form.Item>

            <Form.Item style={styles.formItem}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                block
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                  e.target.style.borderColor = styles.buttonHover.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.button.backgroundColor;
                  e.target.style.borderColor = styles.button.borderColor;
                }}
              >
                Sign up
              </Button>
            </Form.Item>

            {error && (
              <Alert message={error} type="error" showIcon />
            )}
            {success && (
              <Alert message="User registered successfully!" type="success" showIcon />
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;

