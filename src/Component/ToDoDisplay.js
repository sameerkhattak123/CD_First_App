import React from 'react';
import { List, Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function ToDoDisplay(props) {
    const handleStatusChange = (status) => {
        props.item.status = status;
        props.updateItem(props.item);
    }

    const menu = (
        <Menu>
            <Menu.Item key="pending" onClick={() => handleStatusChange('pending')}>Pending</Menu.Item>
            <Menu.Item key="complete" onClick={() => handleStatusChange('complete')}>Complete</Menu.Item>
            <Menu.Item key="missed" onClick={() => handleStatusChange('missed')}>Missed</Menu.Item>
        </Menu>
    );

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <div className="text-center mt-4 p-4 rounded bg-light shadow" style={{ maxWidth: '600px', width: '80%' }}>
                {props.item && (
                    <List
                        bordered
                        dataSource={[props.item.text]}
                        renderItem={(item, index) => (
                            <List.Item
                                className="d-flex justify-content-between align-items-center"
                                actions={[
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <Button>{props.item.status}</Button>
                                    </Dropdown>,
                                    <Space>
                                        <span>{formatDate(props.item.createdAt)}</span>
                                        <Button
                                            type="text"
                                            danger
                                            onClick={() => props.deleteItem(props.index)}
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 1a.5.5 0 0 1 .5.5V2h4V1.5a.5.5 0 0 1 1 0V2h1a2 2 0 0 1 2 2v1a.5.5 0 0 1-.5.5h-.293l-.543 10.973A1 1 0 0 1 12.667 16H3.333a1 1 0 0 1-.997-.527L1.793 5.5H1a.5.5 0 0 1-.5-.5V4a2 2 0 0 1 2-2h1V1.5a.5.5 0 0 1 .5-.5h2zM4 4v1h8V4H4z"/>
                                            </svg>
                                        </Button>
                                    </Space>
                                ]}
                            >
                                <span>{item}</span>
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </div>
    );
}

export default ToDoDisplay;
