// Action/todoActions.js

export const addTodo = (todo) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TODO',
            payload: todo
        });
    };
};

export const deleteTodo = (id) => {
    return (dispatch) => {
        dispatch({
            type: 'DELETE_TODO',
            payload: id
        });
    };
};

export const updateTodo = (todo) => ({
    type: 'UPDATE_TODO',
    payload: todo,
});

export const updateTodoStatus = (id, status) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_TODO_STATUS',
            payload: { id, status }
        });
    };
};


export const toggleTodoStatus = (id)=>{
    return(dispatch)=>{
        dispatch({
            type : 'TOOGLE_TODO_STATUS',
            payload:id
        })
    }
}