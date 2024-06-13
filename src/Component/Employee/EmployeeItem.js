import React, { useEffect, useState } from 'react';
import { Card, Button, Space, Modal, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined, FundViewOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateEmployeeForm from './CreateEmployeeForm';
import ViewEmployeeForm from './ViewEmployeeForm';
import { fetchEmployees, deleteEmployee } from '../../Redux/Action/employeeAction';
import { fetchEmployeeTodos } from '../../Redux/Action/todoAction';
import { useAuthContext } from '../../Hook/useAuthContext';

const EmployeeItem = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees);
  const todos = useSelector(state => state.todos.todos) || [];
  const { user } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees(user.token));
  }, [dispatch, user.token]);

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setViewVisible(true);
  };

  const handleDelete = (employeeId) => {
    dispatch(deleteEmployee(employeeId, user.token));
  };

  const handleCreateEmployee = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setViewVisible(false);
    setSelectedEmployee(null);
  };

  return (
    <div style={{ marginTop: '64px' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateEmployee}>
        Create Employee
      </Button>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {Array.isArray(employees.employees) && employees.employees.map((employee) => (
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
              <p>Todos:</p>
              <ul>
                {todos.filter(todo => todo.assignmentId === employee._id).map(todo => (
                  <li key={todo.id}>{todo.title}</li>
                ))}
              </ul>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal title="Create Employee" visible={visible} onCancel={handleCancel} footer={null}>
        <CreateEmployeeForm />
      </Modal>
      <Modal title="View Employee" visible={viewVisible} onCancel={handleCancel} footer={null}>
        {selectedEmployee && <ViewEmployeeForm employee={selectedEmployee} onClose={handleCancel} />}
      </Modal>
    </div>
  );
};

export default EmployeeItem;
