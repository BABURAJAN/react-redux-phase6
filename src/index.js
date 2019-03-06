import React from 'react';
import {render} from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import {Provider} from "react-redux";
import App  from './app/components/App';

const mathReducer = (state= {
    result:1,
    lastValues:[]
}, action) => {
  switch(action.type){
      case "ADD":
      state={
          ...state,
          result: state.result + action.payload,
          lastValues:[...state.lastValues,action.payload]
      };
     // state.lastValues.push(action.payload);
      break;
      case "SUBTRACT":
      state={
        ...state,
        result: state.result - action.payload,
        lastValues:[...state.lastValues,action.payload]
    };
   // state.lastValues.push(action.payload);
      break;
      default:
      break;
  }
  return state;
};

const userReducer = (state= {
    name:"babu",
    age:25
}, action) => {
  switch(action.type){
      case "SET_NAME":
      state={
          ...state,
          name: action.payload
      };
     // state.lastValues.push(action.payload);
      break;
      case "SET_AGE":
      state={
        ...state,
        age: action.payload
    };
   // state.lastValues.push(action.payload);
      break;
      default:
      break;
  }
  return state;
};

/*const myLogger = (store) => (next) => (action) => {
    console.log("Logged Action : ", action);
    next(action);

};*/

const store = createStore(
    combineReducers({user: mathReducer, math: userReducer}),
     {}, 
     applyMiddleware(logger)
    );

store.subscribe(()=>{
   // console.log("Store updated .. ", store.getState());

});

render(
    <Provider store={store}  >
         <App />
    </Provider>,
    window.document.getElementById('root'));