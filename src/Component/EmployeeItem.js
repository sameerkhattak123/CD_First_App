import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Modal, Row, Col } from 'antd';
import { useEmployeeContext } from '../Hook/useEmployeeContext';
import { EditOutlined, DeleteOutlined, PlusOutlined, FundViewOutlined } from '@ant-design/icons';
import CreateEmployeeForm from './CreateEmployeeForm';
import { useAuthContext } from '../Hook/useAuthContext';
import ViewEmployeeForm from './ViewEmployeeForm';

const EmployeeItem = ({ onDelete }) => {
  const { employees, dispatch } = useEmployeeContext();
  const [visible, setVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeVisible, setEmployeeVisible] = useState(false);
  const { user } = useAuthContext();
  console.log('uSER')

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!user || !user.token) {
        return;
      }
      try {
        const response = await fetch('http://localhost:4000/api/employee/', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        dispatch({ type: 'SET_EMPLOYEES', payload: data });
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  const fetchEmployeeById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch employee details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleCreateEmployee = () => {
    setVisible(true);
  };

  const handleViewEmployee = async (employee) => {
    const employeeDetails = await fetchEmployeeById(employee._id);
    setSelectedEmployee(employeeDetails);
    setEmployeeVisible(true); // Set the modal visible when viewing employee
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEmployeeCancel = () => {
    setEmployeeVisible(false);
  };

  const handleDelete = async (employeeId) => {
    if (!user) {
      return;
    }
    const response = await fetch('http://localhost:4000/api/employee/' + employeeId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_EMPLOYEE', payload: json });
    }
  };

  const handleEmployeeCreated = (newEmployee) => {
    dispatch({ type: 'CREATE_EMPLOYEE', payload: newEmployee });
    setVisible(false);
  };

  return (
    <div style={{ marginTop: '64px' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateEmployee}>
        Create Employee
      </Button>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {employees &&
          employees.map((employee) => (
            <Col key={employee._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={employee.name}
                extra={
                  <Space>
                    <Button type="primary" icon={<FundViewOutlined />} onClick={() => handleViewEmployee(employee)} />
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(employee._id)} />
                  </Space>
                }
                style={{ marginBottom: 20 }}
              >
                <p>Position: {employee.position}</p>
                <p>Department: {employee.department}</p>
                <p>Salary: {employee.salary}</p>
              </Card>
            </Col>
          ))}
      </Row>

      <Modal title="Create Employee" visible={visible} onCancel={handleCancel} footer={null}>
        <CreateEmployeeForm onSuccess={handleEmployeeCreated} />
      </Modal>
      <Modal title="View Employee" visible={employeeVisible} onCancel={handleEmployeeCancel} footer={null}>
        {selectedEmployee && (
          <ViewEmployeeForm
            employee={selectedEmployee}
            visible={employeeVisible}
            onClose={handleEmployeeCancel}
            user={user}
            dispatch={dispatch}
          />
        )}
      </Modal>
    </div>
  );
};

export default EmployeeItem;
