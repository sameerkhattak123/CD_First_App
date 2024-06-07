import React, { useEffect, useState } from 'react';
import ToDoInput from './ToDoInput';
import ToDoDisplay from './ToDoDisplay';

function ToDoList() {
    const [doList, setDoList] = useState([]);

    let addList = (inputText) => {
        setDoList([...doList, inputText]);
    }

    const deleteList = (key) =>{
        let newListTodo= [...doList];
        newListTodo.splice(key,1);
        setDoList([...newListTodo]);
    }

    useEffect(() => {
        console.log(doList);
    }, [doList]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">To Do List</h1>
                    <ToDoInput addList={addList} />
                    {doList.map((listItem, i) => (
                        <ToDoDisplay key={i} index={i} item={listItem} deleteItem = {deleteList}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ToDoList;
