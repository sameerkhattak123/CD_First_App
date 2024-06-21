import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoActionCreators } from '../../Redux/index';
import { Input, Button, Table, Typography, Modal, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchEmployees } from '../../Redux/Action/employeeAction'; // Updated import
import { useAuthContext } from '../../Hook/useAuthContext';

const { Title } = Typography;
const { Option } = Select;

const TodoList = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const { user } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const employees = useSelector(state => state.employees.employees) || []; 
    const [currentTodo, setCurrentTodo] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newAssignment, setNewAssignment] = useState('');
    const [newAssignmentId, setNewAssignmentId] = useState(''); // Track assignment ID

    useEffect(() => {
        dispatch(fetchEmployees(user.token));
    }, [dispatch, user.token]);

    const todos = useSelector(state => state.todos.todos) || [];

    const handleAddTodo = () => {
        if (title.trim() === '') return;
        const newTodo = {
            id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
            title,
            date: new Date().toLocaleDateString(),
            status: 'Pending',
            assignment: '', // Initially, no assignment
            assignmentId: '' // Initially, no assignment ID
        };
        dispatch(todoActionCreators.addTodo(newTodo));
        setTitle('');
    };

    const handleEditClick = (todo) => {
        setCurrentTodo(todo);
        setNewTitle(todo.title);
        setNewStatus(todo.status);
        setNewAssignment(todo.assignment);
        setNewAssignmentId(todo.assignmentId || ''); // Retain assignment ID
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        if (currentTodo) {
            dispatch(todoActionCreators.updateTodo({
                id: currentTodo.id,
                title: newTitle,
                date: currentTodo.date,  // Ensure the date is retained
                status: newStatus,
                assignment: newAssignment,
                assignmentId: newAssignmentId // Save assignment ID
            }));
        }
        setIsEditing(false);
        setCurrentTodo(null);
    };

    const handleDeleteTodo = (id) => {
        dispatch(todoActionCreators.deleteTodo(id));
    };

    const uniqueAssignments = [...new Set(todos.map(todo => todo.assignment).filter(Boolean))];
    const assignmentFilters = [
        ...uniqueAssignments.map(assignment => ({
            text: assignment,
            value: assignment,
        })),
        { text: 'Not Assigned', value: '' }  // Filter option for empty assignments
    ];




    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Created Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'Complete', value: 'Complete' },
                { text: 'Rejected', value: 'Rejected' },
            ],
            onFilter: (value, record) => record.status.includes(value),
            sorter: (a, b) => a.status.localeCompare(b.status),
            showSorterTooltip: {
                target: 'sorter-icon',
            },
        },
        {
            title: 'Assigned',
            dataIndex: 'assignment',
            key: 'assignment',
            filters: assignmentFilters,
            onFilter: (value, record) => value === '' ? !record.assignment : record.assignment === value,
            sorter: (a, b) => a.assignment.localeCompare(b.assignment),

            
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditClick(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteTodo(record.id)}
                    />
                </>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div style={{ width: '60%', margin: 'auto', padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                To-Do List
            </Title>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '40%', marginRight: '10px' }}
                />
                <Button type="primary" onClick={handleAddTodo}>
                    Add To-Do
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={todos}
                pagination={false}
                rowKey="id"
                bordered
                style={{ textAlign: 'center' }}
                onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />
            <Modal
                title="Edit To-Do"
                visible={isEditing}
                onOk={handleSaveClick}
                onCancel={() => setIsEditing(false)}
            >
                <Input
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <Select
                    value={`${newAssignment}::${newAssignmentId}`}
                    onChange={(value) => {
                        const [assignmentName, assignmentId] = value.split('::');
                        setNewAssignment(assignmentName);
                        setNewAssignmentId(assignmentId);
                    }}
                    style={{ width: '100%', marginBottom: '10px' }}
                >
                    {employees.map(employee => (
                        <Option key={employee._id} value={`${employee.name}::${employee._id}`}>
                            {employee.name}
                        </Option>
                    ))}
                </Select>
                <Select
                    value={newStatus}
                    onChange={(value) => setNewStatus(value)}
                    style={{ width: '100%' }}
                >
                    <Option value="Pending">Pending</Option>
                    <Option value="Complete">Complete</Option>
                    <Option value="Rejected">Rejected</Option>
                </Select>
            </Modal>
        </div>
    );
};

export default TodoList;
