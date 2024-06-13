import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import reducers from './Reducer/rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';


export const store = createStore(reducers,{}, composeWithDevTools(applyMiddleware(thunk)))