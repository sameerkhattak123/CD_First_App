import { applyMiddleware, createStore } from "redux";
import {thunk} from "redux-thunk"; // Assuming `thunk` is imported correctly
import rootReducer from './Reducer/rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer, // Pass the root reducer directly
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add middleware if needed
  devTools: composeWithDevTools(), // Adjust devTools if needed
});
