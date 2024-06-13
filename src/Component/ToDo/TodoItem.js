// import React, { useState } from 'react';
// import { Button, Select, Input } from 'antd';

// const { Option } = Select;

// const TodoItem = ({ todo, onUpdateStatus, onDelete, onUpdateTitle, onUpdateAssignment }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [newStatus, setNewStatus] = useState(todo.status);
//     const [newTitle, setNewTitle] = useState(todo.title);
//     const [newAssignment, setNewAssignment] = useState(todo.assignment);

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleSaveClick = () => {
//         onUpdateStatus(todo.id, newStatus);
//         onUpdateTitle(todo.id, newTitle);
//         onUpdateAssignment(todo.id, newAssignment);
//         setIsEditing(false);
//     };

//     const handleCancelClick = () => {
//         setIsEditing(false);
//         setNewStatus(todo.status);
//         setNewTitle(todo.title);
//         setNewAssignment(todo.assignment);
//     };

//     return (
//         <tr>
//             <td>
//                 {isEditing ? (
//                     <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
//                 ) : (
//                     todo.title
//                 )}
//             </td>
//             <td>{todo.date}</td>
//             <td>
//                 {isEditing ? (
//                     <Select value={newStatus} onChange={(value) => setNewStatus(value)}>
//                         <Option value="Pending">Pending</Option>
//                         <Option value="Complete">Complete</Option>
//                         <Option value="Rejected">Rejected</Option>
//                     </Select>
//                 ) : (
//                     todo.status
//                 )}
//             </td>
//             <td>
//                 {isEditing ? (
//                     <Input value={newAssignment} onChange={(e) => setNewAssignment(e.target.value)} />
//                 ) : (
//                     todo.assignment
//                 )}
//             </td>
//             <td>
//                 {isEditing ? (
//                     <>
//                         <Button type="primary" onClick={handleSaveClick}>
//                             Save
//                         </Button>
//                         <Button onClick={handleCancelClick}>Cancel</Button>
//                     </>
//                 ) : (
//                     <>
//                         <Button type="primary" onClick={handleEditClick}>
//                             Edit
//                         </Button>
//                         <Button type="danger" onClick={() => onDelete(todo.id)}>
//                             Delete
//                         </Button>
//                     </>
//                 )}
//             </td>
//         </tr>
//     );
// };

// export default TodoItem;
