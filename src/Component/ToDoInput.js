import React, { useState } from 'react';
import { Input, Button, Dropdown, Menu } from 'antd';

function ToDoInput(props) {
    const [inputText, setInputText] = useState('');

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
            <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your todo here..."
                style={{ maxWidth: '400px' }}
            />
            <Button
                type="primary"
                onClick={() => {
                    props.addList({ text: inputText, status: 'pending', createdAt: new Date() });
                    setInputText('');
                }}
                style={{ marginLeft: '10px' }}
            >
                Add Todo
            </Button>
        </div>
    );
}

export default ToDoInput;
