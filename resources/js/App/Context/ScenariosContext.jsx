import React, { useReducer, useContext } from "react";
import * as TYPES from "./types";
import swal from 'sweetalert';
import {ScenariosAPI } from '../API';
import { useHistory } from "react-router";
import Cookies from 'js-cookie';
import { AlertContext } from "./AlertContext";
import { NotificationsContext } from "./NotificationsContext";
import { AdminContext } from "./AdminContext";


const ScenariosContext = React.createContext();

const ScenariosState = (props) => {
  const initialState = {
    loading: false,
    geofence_types: [],
    actions: [],
    geofences: [],
    scenarios: [],
    totalScenariosNo: 0,
    scenario: {},
    scenariosFilterMode: "all",
    message: '',
    errors: {},
    status: 0,
    inputsState: {
      services: ['',],
    },
  };
  const { logout } = useContext(AdminContext);
  const { addNotification } = useContext(NotificationsContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const [state, dispatch] = useReducer(scenarioReducer, initialState);

  function setInput(e, index) {
    let inputsState = { ...state.inputsState };
    
    switch (e.target.name) {
      case 'services':
        inputsState['services'][index] = e.target.value ? e.target.value : '';
        dispatch({
          type: TYPES.SET_INPUT_VALUE, payload: {
            inputsState: inputsState,
          }
        });
        break;
      case 'geofence_type_id':
        dispatch({
          type: TYPES.SET_INPUT_VALUE, payload: {
            inputsState: { ...inputsState, [e.target.name]: e.target.value }, 
            actions: [],
          }
        });
        break;
      default:
        console.log('normal');
        dispatch({
          type: TYPES.SET_INPUT_VALUE, payload: {
            inputsState: { ...inputsState, [e.target.name]: e.target.value },
          }
        });
    }      

    console.log(state.inputsState);
  }

  function resetAllInputs() {
    dispatch({type:TYPES.RESET_ALL_INPUTS, payload: {
      inputsState: {
        services: [''],
      },
    }});
    console.log(state.inputsState);
  }

  function resetAllErrors() {
    dispatch({type:TYPES.RESET_ALL_ERRORS, payload: {
      errors: {},
    }});
    console.log(state.inputsState);
  }

  function setScenariosFilterMode(mode) {
    dispatch({type:TYPES.SET_OBJECTS_FILTER_MODE, payload: {
      scenariosFilterMode: mode,
    }});
    console.log(mode);
  }
  
  const getGeofences_Actions_GeofenceTypes = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await ScenariosAPI.get(`/scenarios-Data`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("all scenarios Data");
      console.log(response);
      // console.log('aa');
      // console.log(response.data.scenarios_data.geofence_types);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({ 
          type: TYPES.GET_ALL_SCENARIOS_DATA, payload: { 
            geofence_types: response.data.scenarios_data.geofence_types, 
            actions: response.data.scenarios_data.actions, 
            geofences: response.data.scenarios_data.geofences, 
            message: response.data.message,
            status: response.data.status, 
          }
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

  const getAllScenarios = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await ScenariosAPI.get(`/all`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("all scenarios");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_ALL_OBJECTS, payload: { 
          scenarios: response.data.scenarios_data.scenarios, 
          totalScenariosNo: response.data.scenarios_data.totalScenariosNo, 
          scenariosFilterMode: "all", 
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

  const getScenarioById = async (id) => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await ScenariosAPI.get(`/get-scenario/${id}`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("get scenario");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_OBJECT_BY_ID, payload: { 
          scenario: response.data.scenario,
          inputsState: response.data.scenario,
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

  function addService() {
    let services = [...state.inputsState.services];
    services.push('');
    
    dispatch({type:TYPES.SET_SERVICES_NUMBER, payload: {
      services: services,
    }})
  }

  function removeService() {
    if (state.inputsState.services.length > 1) {
      let services = [...state.inputsState.services];
      services.pop();
      
      dispatch({type:TYPES.SET_SERVICES_NUMBER, payload: {
        services: services,
      }})
    }
  }

  const addScenario = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This Scenario will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        console.log(inputsState);
        dispatch({ type: TYPES.SET_LOADING });
        inputsState = {
          ...inputsState,
          action_id: Number(inputsState.action_id),
          geofence_id: Number(inputsState.geofence_id),
          geofence_type_id: Number(inputsState.geofence_type_id),
        };
  
        const resp = await ScenariosAPI.post(`/add`, inputsState, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Add scenario");
            dispatch({ 
              type: TYPES.ADD_OBJECT, payload: { 
              message: response.data.message,
              status: response.data.status, 
              errors: {},
              }
            });
            addNotification({
              type: 'log',
              title: 'scenario_has_been_added',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/scenarios/all`);
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/scenarios/addScenario`);
            })
          }
        });
      } else {
        swal("The scenario has not been added!");
      } 
    });
  };

  const updateScenario = (id, inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This Scenario will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willUpdate) => {
      if (willUpdate) {
        dispatch({ type: TYPES.SET_LOADING });
        console.log(inputsState);
        const resp = await ScenariosAPI.put(`/update/${id}`, inputsState, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Update Scenario");
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
              title: 'scenario_has_been_updated',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/scenarios/all`);
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/scenarios/editScenario/${id}`);
            })
          }
        });
      } else {
        swal("The scenarios has not been updated!");
      }
    });
  };

  const deleteScenario = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This Scenario will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {  
        dispatch({ type: TYPES.SET_LOADING });  
        const resp = await ScenariosAPI.delete(`/delete/${id}`, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Delete Scenario");
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({
              type: TYPES.DELETE_OBJECT, payload: { 
              message: response.data.message, 
              status: response.data.status ,
            }});
            await setAlert('pink', 'Scenario has been deleted successfully');
            await getAllScenarios();
            addNotification({
              type: 'log',
              title: 'scenario_has_been_deleted',
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/scenarios/all`);
            })
          }
        });
      } else {
        swal("The scenario has not been deleted!");
      }
    });
  };

  return (
    <ScenariosContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,
        
        geofence_types: state.geofence_types,
        actions: state.actions,
        geofences: state.geofences,
        scenarios: state.scenarios,
        scenario: state.scenario,
        totalScenariosNo: state.totalScenariosNo,
        getAllScenarios,
        getScenarioById,
        getGeofences_Actions_GeofenceTypes,
        addScenario,
        updateScenario,
        deleteScenario,
        
        addService,
        removeService,

        scenariosFilterMode: state.scenariosFilterMode,
        setScenariosFilterMode,
        
        inputsState: state.inputsState,
        setInput,
        resetAllInputs,
        resetAllErrors,

      }}
    >
      {props.children}
    </ScenariosContext.Provider>
  );
};

const scenarioReducer = (state, action) => {
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
    case TYPES.RESET_ALL_ERRORS:
      return {
        ...state,
        errors: action.payload.errors,
      };
    case TYPES.VALIDATION_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
      };  
    case TYPES.GENERAL_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors ? action.payload.errors : {},
        status: action.payload.status,
        loading: false,
      };
    
    case TYPES.SET_OBJECTS_FILTER_MODE:
      return {
        ...state,
        scenariosFilterMode: action.payload.scenariosFilterMode ? action.payload.scenariosFilterMode : "all",
      };

    case TYPES.SET_SERVICES_NUMBER:
      return {
        ...state,
        inputsState : {...state.inputsState, services : action.payload.services},
      };
  
    
    case TYPES.GET_ALL_SCENARIOS_DATA:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        status: action.payload.status,
        geofence_types: action.payload.geofence_types  ? action.payload.geofence_types: [],
        actions: action.payload.actions  ? action.payload.actions: [],
        geofences: action.payload.geofences  ? action.payload.geofences: [],
      };
    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        scenarios: action.payload.scenarios  ? action.payload.scenarios: [],
        totalScenariosNo: action.payload.totalScenariosNo  ? action.payload.totalScenariosNo: 0,
        scenariosFilterMode: action.payload.scenariosFilterMode  ? action.payload.scenariosFilterMode: "all",
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.GET_OBJECT_BY_ID:
      return {
        ...state,
        scenario: action.payload.scenario ? action.payload.scenario: {},
        inputsState: action.payload.inputsState ? action.payload.inputsState: {},
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.ADD_OBJECT:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
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

export {ScenariosContext,ScenariosState };
