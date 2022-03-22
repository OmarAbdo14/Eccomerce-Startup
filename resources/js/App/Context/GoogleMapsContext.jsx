import React, { useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from 'sweetalert';
import * as TYPES from "./types";
// import { GoogleMapsAPI } from '../API';
import { NotificationsContext } from './NotificationsContext';
import { AlertContext } from "./AlertContext";
import { AdminContext } from "./AdminContext";

const GoogleMapsContext = React.createContext();
const GoogleMapsState = (props) => {
  const history = useHistory();
  const { logout } = useContext(AdminContext);
  const { addNotification } = useContext(NotificationsContext);
  const { setAlert } = useContext(AlertContext);
  
  const initialState = {
    loading: false,
    status: 0,
    message: '',
    errors: {},
  };

  const [state, dispatch] = useReducer(googleMapsReducer, initialState);


  return (
    <GoogleMapsContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,
        // initMap,
      }}
    >
      {props.children}
    </GoogleMapsContext.Provider>
  );
};

const googleMapsReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case TYPES.GENERAL_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors ? action.payload.errors : {},
        status: action.payload.status,
        loading: false,
      };    
    default:
      return state;
  }
};

export { GoogleMapsContext, GoogleMapsState };
