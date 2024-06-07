import React, { useState } from 'react';
import { Row, Col, Typography, List, Button, Dropdown, Menu } from 'antd';
import ToDoInput from './ToDoInput';
import ToDoDisplay from './ToDoDisplay';

const { Title } = Typography;

function ToDoList() {
    const [doList, setDoList] = useState([]);
    const [filteredStatus, setFilteredStatus] = useState('all');

    const addList = (todo) => {
        setDoList([...doList, todo]);
    }

    const deleteList = (key) => {
        const newListTodo = [...doList];
        newListTodo.splice(key, 1);
        setDoList([...newListTodo]);
    }

    const updateItem = (updatedItem) => {
        const updatedList = doList.map((item, index) => {
            if (index === updatedItem.index) {
                return updatedItem;
            }
            return item;
        });
        setDoList(updatedList);
    }

    const handleStatusFilter = (status) => {
        setFilteredStatus(status);
    }

    const filterToDoList = () => {
        if (filteredStatus === 'all') {
            return doList;
        } else {
            return doList.filter(item => item.status === filteredStatus);
        }
    }

    return (
        <div style={{ padding: '50px' }}>
            <Row justify="center">
                <Col span={12}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>To Do List</Title>
                    <ToDoInput addList={addList} />
                    <Dropdown overlay={
                        <Menu onClick={({ key }) => handleStatusFilter(key)}>
                            <Menu.Item key="all">All</Menu.Item>
                            <Menu.Item key="pending">Pending</Menu.Item>
                            <Menu.Item key="complete">Complete</Menu.Item>
                            <Menu.Item key="missed">Missed</Menu.Item>
                        </Menu>
                    }>
                        <Button>{filteredStatus === 'all' ? 'Filter by Status' : `Filtered by ${filteredStatus}`}</Button>
                    </Dropdown>
                    <List
                        bordered
                        dataSource={filterToDoList()}
                        renderItem={(listItem, index) => (
                            <ToDoDisplay
                                item={{...listItem, index}} 
                                key={index} 
                                deleteItem={deleteList}
                                updateItem={updateItem} 
                            />
                        )}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default ToDoList;
