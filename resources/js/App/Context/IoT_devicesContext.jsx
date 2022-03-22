import React, { useReducer, useContext } from "react";
import * as TYPES from "./types";
import swal from 'sweetalert';
import {IoT_devicesAPI } from '../API';
import { useHistory } from "react-router";
import { AlertContext } from "./AlertContext";
import Cookies from 'js-cookie';
import { NotificationsContext } from "./NotificationsContext";
import { AdminContext } from "./AdminContext";


const IoT_devicesContext = React.createContext();

const IoT_devicesState = (props) => {
  const initialState = {
    loading: false,
    IoT_devices: [],
    IoTGeofences: [],
    AvailableIoTDevices: [],
    totalIoT_devicesNo: 0,
    IoT_device: {},
    IoT_devicesFilterMode: "all",
    message: '',
    errors: {},
    status: 0,
    inputsState: {},
  };
  const { logout } = useContext(AdminContext);
  const { addNotification } = useContext(NotificationsContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const [state, dispatch] = useReducer(IoT_deviceReducer, initialState);

  async function setInput(e, index) {
    let inputsState = { ...state.inputsState };
    
    switch (e.target.name) {
      case 'points_list_polygon_y':
        inputsState['points_list_polygon'][index][1] = Number(e.target.value) ? Number(e.target.value) : 0;  
        break;
      default:
        console.log('normal');
        inputsState = { ...inputsState, [e.target.name]: e.target.value };  
    }
    await dispatch({type:TYPES.SET_INPUT_VALUE, payload: {
      inputsState: inputsState
    }});
    console.log(state.inputsState);
  }

  function resetAllInputs() {
    dispatch({type:TYPES.RESET_ALL_INPUTS, payload: {
      inputsState: {},
    }});
    console.log(state.inputsState);
  }

  function resetAllErrors() {
    dispatch({type:TYPES.RESET_ALL_ERRORS, payload: {
      errors: {},
    }});
    console.log(state.inputsState);
  }

  function setIoT_devicesFilterMode(mode) {
    dispatch({type:TYPES.SET_OBJECTS_FILTER_MODE, payload: {
      IoT_devicesFilterMode: mode,
    }});
    console.log(mode);
  }

  const getAllIoT_devices = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    const resp = await IoT_devicesAPI.get(`/all`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response) => {
      console.log("all IoT_devices");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_ALL_OBJECTS, payload: { 
          IoT_devices: response.data.IoT_devices_data.IoT_devices, 
          totalIoT_devicesNo: response.data.IoT_devices_data.totalIoT_devicesNo, 
          IoT_devicesFilterMode: "all", 
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

  const getAllIoTGeofences = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await IoT_devicesAPI.get(`/IoT-geofences`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("all IoT Geofences");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_ALL_IOT_GEOFENCES, payload: { 
          IoTGeofences: response.data.IoTGeofences, 
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

  const getAvailableIoTDevices = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await IoT_devicesAPI.get(`/get-available-IoTDevices`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("all IoT Devices");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_ALL_AVAILABLE_IOT_DEVICES, payload: { 
          IoTDevices: response.data.IoTDevices, 
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

  const getIoT_deviceById = async (id) => {
    dispatch({ type: TYPES.SET_LOADING });
  
    const resp = await IoT_devicesAPI.get(`/get-IoTDevice/${id}`, {
      params: { id: id },
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async (response) => {
      console.log("get IoTDevice");
      console.log(response.data.IoT_device);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_OBJECT_BY_ID, payload: { 
          IoT_device: response.data.IoT_device,
          inputsState: {
            ...response.data.IoT_device,
          },
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

  const addIoT_device = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This IoT device will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        console.log(inputsState);
        dispatch({ type: TYPES.SET_LOADING });
  
        const resp = await IoT_devicesAPI.post(`/add`, inputsState, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Add IoT device");
            dispatch({ 
              type: TYPES.ADD_OBJECT, payload: { 
              message: response.data.message,
              status: response.data.status, 
              errors: {},
              }
            });
            addNotification({
              type: 'log',
              title: 'IoT_device_has_been_added',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/IoT_devices/all`);
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/IoT_devices/addIoT_device`);
            })
          }
        });
      } else {
        swal("The IoT_device has not been added!");
      } 
    });
  };

  const updateIoT_device = (id, inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This IoT device will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willUpdate) => {
      if (willUpdate) {
        dispatch({ type: TYPES.SET_LOADING });
        console.log(inputsState);
        const resp = await IoT_devicesAPI.put(`/update/${id}`, inputsState, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Update IoT device");
          console.log(response);
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Update IoT device");
            dispatch({ 
              type: TYPES.UPDATE_OBJECT, payload: { 
              message: response.data.message,
              status: response.data.status, 
              errors: {},
              }
            });
            addNotification({
              type: 'log',
              title: 'IoT_device_has_been_updated',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/IoT_devices/all`);
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/IoT_devices/editIoT_device/${id}`);
            })
          }
        });
      } else {
        swal("The IoT_device has not been updated!");
      }
    });
  };

  const deleteIoT_device = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This IoT device will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {  
        dispatch({ type: TYPES.SET_LOADING });  
        const resp = await IoT_devicesAPI.delete(`/delete/${id}`, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Delete IoT device");
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({
              type: TYPES.DELETE_OBJECT, payload: { 
              message: response.data.message, 
              status: response.data.status ,
            }});
            await setAlert('pink', 'IoT device has been deleted successfully');
            await getAllIoT_devices();
            addNotification({
              type: 'log',
              title: 'IoT_device_has_been_deleted',
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/IoT_devices/all`);
            })
          }
        });
      } else {
        swal("The IoT_device has not been deleted!");
      }
    });
  };


  return (
    <IoT_devicesContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,
        
        IoTGeofences: state.IoTGeofences,
        AvailableIoTDevices: state.AvailableIoTDevices,
        getAllIoTGeofences,
        getAvailableIoTDevices,
        
        IoT_device: state.IoT_device,
        IoT_devices: state.IoT_devices,
        totalIoT_devicesNo: state.totalIoT_devicesNo,
        getAllIoT_devices,
        getIoT_deviceById,
        addIoT_device,
        updateIoT_device,
        deleteIoT_device,
        
        IoT_devicesFilterMode: state.IoT_devicesFilterMode,
        setIoT_devicesFilterMode,
        
        inputsState: state.inputsState,
        setInput,
        resetAllInputs,
        resetAllErrors,

      }}
    >
      {props.children}
    </IoT_devicesContext.Provider>
  );
};

const IoT_deviceReducer = (state, action) => {
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
        IoT_devicesFilterMode: action.payload.IoT_devicesFilterMode ? action.payload.IoT_devicesFilterMode : "all",
      };  
    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        IoT_devices: action.payload.IoT_devices  ? action.payload.IoT_devices: [],
        totalIoT_devicesNo: action.payload.totalIoT_devicesNo  ? action.payload.totalIoT_devicesNo: 0,
        IoT_devicesFilterMode: action.payload.IoT_devicesFilterMode  ? action.payload.IoT_devicesFilterMode: "all",
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.GET_ALL_IOT_GEOFENCES:
      return {
        ...state,
        IoTGeofences: action.payload.IoTGeofences  ? action.payload.IoTGeofences: [],
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.GET_ALL_AVAILABLE_IOT_DEVICES:
      return {
        ...state,
        AvailableIoTDevices: action.payload.IoTDevices  ? action.payload.IoTDevices: [],
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.GET_OBJECT_BY_ID:
      return {
        ...state,
        IoT_device: action.payload.IoT_device ? action.payload.IoT_device: {},
        inputsState: action.payload.inputsState ? action.payload.inputsState: {},
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.GET_OBJECT_BY_ID_ERRORS:
      return {
        ...state,
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

export {IoT_devicesContext,IoT_devicesState };
