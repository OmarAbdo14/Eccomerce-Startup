import React, { useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from 'sweetalert';
import * as TYPES from "./types";
import { ActionsAPI } from '../API';
import { NotificationsContext } from './NotificationsContext';
import { AlertContext } from "./AlertContext";
import { AdminContext } from "./AdminContext";

const ActionsContext = React.createContext();
const ActionsState = (props) => {
  const history = useHistory();
  const { logout } = useContext(AdminContext);
  const { addNotification } = useContext(NotificationsContext);
  const { setAlert } = useContext(AlertContext);
  
  const initialState = {
    loading: false,
    status: 0,
    message: '',
    errors: {},
    auth: false,
    action: {},
    geofenceTypes: [],
    actions: [],
    totalActionsNo: 0,
    actionsFilterMode: "all",
    inputsState: {},
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
      inputsState: {},
    }});
  }

  function resetAllErrors() {
    dispatch({type:TYPES.RESET_ALL_ERRORS, payload: {
      errors: {},
    }});
    console.log(state.inputsState);
  }

  function setActionsFilterMode(mode) {
    dispatch({type:TYPES.SET_OBJECTS_FILTER_MODE, payload: {
      actionsFilterMode: mode,
    }});
    console.log(mode);
  }

  const getAllActions = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await ActionsAPI.get(`/all`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` }
    }).then(async (response) => {
      console.log("all actions");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({ 
          type: TYPES.GET_ALL_OBJECTS, payload: { 
            actions: response.data.actions_data.actions, 
            totalActionsNo: response.data.actions_data.totalActionsNo, 
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

  const getGeofenceTypes = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    const resp = await ActionsAPI.get(`/get-geofenceTypes`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` }
    }).then(async (response) => {
      console.log("all geofence types");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({ 
          type: TYPES.GET_ALL_OBJECTS, payload: { 
            geofenceTypes: response.data.geofenceTypes, 
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

  const getActionById = async (id) => {
    dispatch({ type: TYPES.SET_LOADING });
  
    const resp = await ActionsAPI.get(`/get-action/${id}`, {
      params: { id: id },
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async (response) => {
      console.log("get action");
      console.log(response.data);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({ 
          type: TYPES.GET_OBJECT_BY_ID, payload: { 
          action: response.data.action, 
          inputsState: {...response.data.action, geofence_type:response.data.action.geofence_type.id}, 
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
  
  const addAction = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This action will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        dispatch({ type: TYPES.SET_LOADING });
  
        const resp = await ActionsAPI.post(`/add`, inputsState, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Add action");
            dispatch({ 
              type: TYPES.ADD_OBJECT, payload: { 
              message: response.data.message,
              status: response.data.status, 
              errors: {},
            }});
            addNotification({
              type: 'log',
              title: 'action_has_been_added',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/actions/all`);
            });
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
              text: "The given data was invalid.",
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
            swal({
              title: "Sorry!",
              text: "Something went wrong.",
              icon: "error",
              button: "OK",
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/actions/addAction`);
            });
          }
        }); 
      } else {
        swal("The action has not been added!");
      }
    });
  };

  const updateAction = async (id, inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This action will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willAdd) => {
      if (willAdd) {
        dispatch({ type: TYPES.SET_LOADING });
    
        const resp = await ActionsAPI.put(`/update/${id}`, inputsState, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async(response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Update admin");
            console.log(response.data);
            dispatch({ 
              type: TYPES.UPDATE_OBJECT, payload: { 
              message: response.data.message,
              status: response.data.status, 
              errors: {},
            }});
            addNotification({
              type: 'log',
              title: 'action_has_been_updated',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {        
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/actions/all`);
            });
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
              text: "The given data was invalid.",
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
            swal({
              title: "Sorry!",
              text: "Something went wrong.",
              icon: "error",
              button: "OK",
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/actions/editAction/${id}`);
            });
          }
        });
      } else {
        swal("The action has not been updated!");
      }
    });
  };

  const deleteAction = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This Action will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {  
        dispatch({ type: TYPES.SET_LOADING });  
        const resp = await ActionsAPI.delete(`/delete/${id}`, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Delete Action");
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({
              type: TYPES.DELETE_OBJECT, payload: { 
              message: response.data.message, 
              status: response.data.status ,
            }});
            await setAlert('pink', 'Action has been deleted successfully');
            await getAllActions();
            addNotification({
              type: 'log',
              title: 'Action_has_been_deleted',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
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
            swal({
              title: "Sorry!",
              text: "Somthing went wrong.",
              icon: "error",
              button: "OK",
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
            }).then(async (value) => {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/actions/all`);
            })
          }
        });
      } else {
        swal("The Action has not been deleted!");
      }
    });
  };


  return (
    <ActionsContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,

        geofenceTypes: state.geofenceTypes,
        getGeofenceTypes,
        action: state.action,
        actionsFilterMode: state.actionsFilterMode,
        actions: state.actions,
        totalActionsNo: state.totalActionsNo,
        setActionsFilterMode,
        getAllActions,
        getActionById,
        addAction,
        updateAction,
        deleteAction,
        
        inputsState: state.inputsState,        
        setInput,
        resetAllInputs,
        resetAllErrors,
        
      }}
    >
      {props.children}
    </ActionsContext.Provider>
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
    case TYPES.GENERAL_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors ? action.payload.errors : {},
        status: action.payload.status,
        loading: false,
      };
  
    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        geofenceTypes: action.payload.geofenceTypes ? action.payload.geofenceTypes : [],
        actions: action.payload.actions ? action.payload.actions : [],
        errors: action.payload.errors,
    };
    
    case TYPES.ADD_OBJECT:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        errors: action.payload.errors,
        inputsState: action.payload.inputsState,
      };
    case TYPES.UPDATE_OBJECT:
      return {
        ...state,
        message: action.payload.message,
        inputsState: action.payload.inputsState,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.SET_OBJECTS_FILTER_MODE:
      return {
        ...state,
        actionsFilterMode: action.payload.actionsFilterMode ? action.payload.actionsFilterMode : "all",
      };
    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        actions: action.payload.actions  ? action.payload.actions: [],
        totalActionsNo: action.payload.totalActionsNo  ? action.payload.totalActionsNo: 0,
      };
    case TYPES.GET_OBJECT_BY_ID:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        action: action.payload.action ? action.payload.action: {},
        inputsState: action.payload.inputsState ? action.payload.inputsState: {},
      };
    case TYPES.GET_OBJECT_BY_ID_ERRORS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
      };
    case TYPES.DELETE_OBJECT:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };

    default:
      return state;
  }
};

export { ActionsContext, ActionsState };
