import React, { useReducer } from "react";
import * as TYPES from "./types";
import {API} from "../API";

const AlertContext = React.createContext();

const AlertState = (props) => {
  const initialState = {
    body: '',
    color: '',
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = async (color, body) => {
    await dispatch({ type: TYPES.SET_ALERT, payload: { 
      color: color, 
      body: body, 
    }
    });
    console.log('alert');
    setTimeout(() => {
      dispatch({ type: TYPES.REMOVE_ALERT });
      console.log('remove alert');
    }, 6000); 
  };

  return (
    <AlertContext.Provider 
      value={{ 
        alert: state, 
        setAlert, 
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

const AlertReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_ALERT:
      return {
        ...state,
        body:action.payload.body ? action.payload.body : '',
        color:action.payload.color ? action.payload.color : '',
      };
    case TYPES.REMOVE_ALERT:
      return {
        ...state,
        body:'',
        color:'',
      };
    default:
      return state;
  }
};

export { AlertState, AlertContext };
