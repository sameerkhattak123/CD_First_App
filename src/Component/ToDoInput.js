import React, { useState } from 'react';


function ToDoInput(props) {
    const [inputText,setInputText] = useState('');

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="input-group" style={{ maxWidth: '400px' }}>
        <input value={inputText} type="text" className="form-control" placeholder="Enter your todo here..." onChange={e =>{
            setInputText(e.target.value)
        }} />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" 
          onClick={()=>
            {props.addList(inputText)
                setInputText("")
            }
          } >Add Todo</button>
        </div>
      </div>
     
    </div>
  );
}

export default ToDoInput;
