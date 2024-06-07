import React from 'react';

function ToDoDisplay(props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="text-center mt-4 p-4 rounded bg-light shadow" style={{ maxWidth: '600px', width: '50%' }}>
        {props.item && (
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>{props.item}</span>
              <span   onClick={e=>{
                props.deleteItem(props.index)
              }}  className="text-danger trash-icon" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 1a.5.5 0 0 1 .5.5V2h4V1.5a.5.5 0 0 1 1 0V2h1a2 2 0 0 1 2 2v1a.5.5 0 0 1-.5.5h-.293l-.543 10.973A1 1 0 0 1 12.667 16H3.333a1 1 0 0 1-.997-.527L1.793 5.5H1a.5.5 0 0 1-.5-.5V4a2 2 0 0 1 2-2h1V1.5a.5.5 0 0 1 .5-.5h2zM4 4v1h8V4H4z"/>
                </svg>
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default ToDoDisplay;