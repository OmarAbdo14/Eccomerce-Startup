import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from 'sweetalert';
import * as TYPES from "./types";
import { API } from '../API';

const AdminContext = React.createContext();
const AdminState = (props) => {
  const history = useHistory();
  
  const initialState = {
    loading: false,
    status: 0,
    message: '',
    errors: {},
    auth: false,
    admin: {},
    inputsState: {
      // password: '',
      // identifier: '',
    },
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  function setInput(e) {
    dispatch({type:TYPES.SET_INPUT_VALUE, payload: {
      inputsState: {...state.inputsState, [e.target.name]: e.target.value},
    }});
    console.log(state.inputsState);
  }

  function resetAllInputs() {
    dispatch({type:TYPES.RESET_ALL_INPUTS, payload: {
      inputsState: {
        // password: '',
        // identifier: '',
        // roles: [],
        // full_name: '',
        // image: null,
      },
    }});
  }

  function resetAllErrors() {
    dispatch({type:TYPES.RESET_ALL_ERRORS, payload: {
      errors: {},
    }});
    console.log(state.inputsState);
  }

  function setAuth(status) {
    dispatch({type:TYPES.SET_AUTH, payload: {
      auth: status,
    }});
    // console.log(state.inputsState);
  }

  function getAdmin() {
    // console.log(admin);
    dispatch({type:TYPES.GET_ADMIN, payload: {
      admin: JSON.parse(Cookies.get('admin')),
    }});
    // console.log(JSON.parse(Cookies.get('admin')));
  }

  const login = async (inputsState) => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await API.post(`/login`, inputsState)
    .then((response) => {
      console.log("login");
      // console.log(response);
      if (response.data.errorNum === 'S000') {
        Cookies.set('admin', JSON.stringify(response.data.admin));
        dispatch({
          type: TYPES.LOGIN, payload: {
            auth: true,
            admin: response.data.admin,
            message: response.data.message,
            status: response.data.status,
          }
        });
        history.replace(`/${JSON.parse($supportedLocales).current_lang}/dashboard/geofences/all`);
      } else if(response.data.errorNum === 'S001') {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          errors: {identifier: response.data.message},
          status: response.data.status, 
        }});
        swal({
          title: "Sorry!",
          text: "The given data was invalid.",
          icon: "error",
          button: "OK",
        });
      } else if(response.data.errorNum === 'S002') {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          errors: {password: response.data.message},
          status: response.data.status, 
        }});
        swal({
          title: "Sorry!",
          text: "The given data was invalid.",
          icon: "error",
          button: "OK",
        });
      }
      }).catch((error)=> {
      if(error.response) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error.response.data.message,
          errors: error.response.data.errors,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  async function logout() {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await API.post(`/admin/logout`, {}, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` }
    })
    .then(async(response)=> {
      console.log("logout");
      // console.log(response);
      Cookies.remove('admin');
      dispatch({ 
        type: TYPES.LOGOUT, payload: {
        admin: {},   
        message: response.data.message,
        status: response.data.status, 
        auth: false,
      }});
      history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`)
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error.response.data.message,
          errors: error.response.data.errors,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      }
    });
  };


  return (
    <AdminContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,

        auth: state.auth,
        admin: state.admin,
        login,
        logout,
        setAuth,
        getAdmin,
      
        inputsState: state.inputsState,        
        setInput,
        resetAllInputs,
        resetAllErrors,
        
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case TYPES.SET_INPUT_VALUE:
      return {
        ...state,
        inputsState: action.payload.inputsState ? action.payload.inputsState : {},
      };
    case TYPES.RESET_ALL_INPUTS:
      return {
        ...state,
        inputsState: action.payload.inputsState ? action.payload.inputsState : {},
      };
    case TYPES.VALIDATION_ERRORS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        errors: action.payload.errors,
      };  
    case TYPES.RESET_ALL_ERRORS:
      return {
        ...state,
        errors: action.payload.errors,
      };

    case TYPES.SET_AUTH:
      return {
        ...state,
        loading: false,
        auth: action.payload.auth,
        
      };
    case TYPES.GET_ADMIN:
      return {
        ...state,
        admin: action.payload.admin ? action.payload.admin : {},
        status: action.payload.status,
        message: action.payload.message,
        loading: false,

      };  
    case TYPES.LOGIN:
      return {
        ...state,
        loading: false,
        // auth: action.payload.auth ? action.payload.auth : false,
        status: action.payload.status,
        message: action.payload.message,
        errors: action.payload.errors ? action.payload.errors : {},
        // admin: action.payload.admin ? action.payload.admin : {},
      };
    case TYPES.LOGOUT:
      return {
        ...state,
        loading: false,
        auth: action.payload.auth,
        status: action.payload.status,
        message: action.payload.message,
        admin: action.payload.admin ? action.payload.admin : {},
      };
    
    default:
      return state;
  }
};

export { AdminContext, AdminState };
