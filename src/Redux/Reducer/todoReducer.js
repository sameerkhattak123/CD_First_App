

const initialState = {
    todos: []
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case 'UPDATE_TODO_STATUS':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, status: action.payload.status }
                        : todo
                )
            };
            case 'UPDATE_TODO':
                return {
                    ...state,
                    todos: state.todos.map(todo => 
                        todo.id === action.payload.id ? action.payload : todo
                    )
                };
    
        default:
            return state;
    }
};

export default todoReducer;

