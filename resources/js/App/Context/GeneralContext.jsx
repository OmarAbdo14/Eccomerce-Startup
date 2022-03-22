import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from 'sweetalert';
import * as TYPES from "./types";
import { API } from '../API';
import { NotificationsContext } from "./NotificationsContext";
import { AdminContext } from "./AdminContext";

const GeneralContext = React.createContext();
const GeneralState = (props) => {
  const { logout } = useContext(AdminContext);
  const { addNotification } = useContext(NotificationsContext);
  const history = useHistory();
  
  const initialState = {
    loading: false,
    status: 0,
    message: '',
    errors: {},
    inputsState: {},
    supportedLocales: {},
    content: {},
  };

  const [state, dispatch] = useReducer(generalReducer, initialState);

  function setSettings(e) {
    let inputsState = {...state.inputsState};
    switch (e.target.name) {
      case "organization_radius":
        inputsState.radius = Number(e.target.value) ? Number(e.target.value) : "";
        break;
      case "organization_coordinates_x":
        inputsState["organization_coordinates"][0] = Number(e.target.value) ? Number(e.target.value) : "";
        break;
      case "organization_coordinates_y":
        inputsState["organization_coordinates"][1] = Number(e.target.value) ? Number(e.target.value) : "";
        break;
    }
    
    dispatch({type:TYPES.SET_INPUT_VALUE, payload: {
      inputsState: {...state.inputsState, [e.target.name]: e.target.value},
    }});
    console.log(state.inputsState);
  }

  function resetAllErrors() {
    dispatch({type:TYPES.RESET_ALL_ERRORS, payload: {
      errors: {},
    }});
    console.log(state.inputsState);
  }

  const getSupportedLocales = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await API.get(`/get-supported-locales`, {
      // headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("get supportedLocales");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('supportedLocales', response.data.supportedLocales);
        dispatch({ 
          type: TYPES.GET_SUPPORTED_LOCALES, payload: { 
          supportedLocales: response.data.supportedLocales,
          message: response.data.message,
          status: response.data.status, 
        }});
      } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
        await logout();
        history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      } else {
        dispatch({ 
          type: TYPES.GENERAL_ERRORS, payload: { 
          message: response.data.message,
          status: response.data.status, 
          }
        });
      }
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  const getContent = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await API.get(`/get-content`, {
      // headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("get content");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('content', response.data.content);
        dispatch({ 
          type: TYPES.GET_CONTENT, payload: { 
          content: response.data.content,
          message: response.data.message,
          status: response.data.status, 
        }});
      } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
        await logout();
        history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      } else {
        dispatch({ 
          type: TYPES.GENERAL_ERRORS, payload: { 
          message: response.data.message,
          status: response.data.status, 
          }
        });
      }
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  const getSettings = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await API.get(`/admin/get-settings`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("all settings");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({ 
          type: TYPES.GET_ALL_OBJECTS, payload: { 
          inputsState: response.data.settings,
          message: response.data.message,
          status: response.data.status, 
        }});
      } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
        await logout();
        history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      } else {
        dispatch({ 
          type: TYPES.GENERAL_ERRORS, payload: { 
          message: response.data.message,
          status: response.data.status, 
          }
        });
      }
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

  const saveSettings = (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This settings will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willUpdate) => {
      if (willUpdate) {
        dispatch({ type: TYPES.SET_LOADING });

        const resp = await API.put(`/admin/save-settings`, inputsState, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Update settings");
          console.log(response);
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({ 
              type: TYPES.UPDATE_OBJECT, payload: { 
              message: response.data.message,
              status: response.data.status, 
              errors: {},
              }
            });
            addNotification({
              type: 'log',
              title: 'setting_has_been_updated',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            })
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
            await logout();
            history.replace(`/${JSON.parse($supportedLocales).current_lang}/login`);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            });
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === 'S004' || response.data.errorNum === 'S003')) {
            dispatch({ 
              type: TYPES.VALIDATION_ERRORS, payload: { 
              errors: response.data.message,
              status: response.data.status, 
            }});
            swal({
              title: "Sorry!",
              text: response.data.message,
              icon: "error",
              button: "OK",
            });
          } else {
            dispatch({ 
              type: TYPES.GENERAL_ERRORS, payload: { 
              message: response.data.message,
              status: response.data.status, 
              }
            });
          }
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
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/settings`);
            })
          }
        });
      } else {
        swal("The setting has not been updated!");
      }
    });
  };

  return (
    <GeneralContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,
        resetAllErrors,
        
        inputsState: state.inputsState,
        getSettings,
        saveSettings,
        setSettings,

        supportedLocales: state.supportedLocales,
        getSupportedLocales,
        content: state.content,
        getContent,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

const generalReducer = (state, action) => {
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
    
    case TYPES.GET_CONTENT:
      return {
        ...state,
        loading: false,
        content: action.payload.content ? action.payload.content : {},
        status: action.payload.status,
        message: action.payload.message,
      };
    case TYPES.GET_SUPPORTED_LOCALES:
      return {
        ...state,
        loading: false,
        supportedLocales: action.payload.supportedLocales ? action.payload.supportedLocales : {},
        status: action.payload.status,
        message: action.payload.message,
      };
    
    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        inputsState: action.payload.inputsState ? action.payload.inputsState : [],
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
      };  
    case TYPES.UPDATE_OBJECT:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
      };  
    
    default:
      return state;
  }
};

export { GeneralContext, GeneralState };
