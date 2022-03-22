import React, { useReducer, useContext } from "react";
import * as TYPES from "./types";
import swal from 'sweetalert';
import {UsersAPI } from '../API';
import { useHistory } from "react-router";
import Cookies from 'js-cookie';
import { AlertContext } from "./AlertContext";
import { NotificationsContext } from "./NotificationsContext";
import { AdminContext } from "./AdminContext";


const UsersContext = React.createContext();

const UsersState = (props) => {
  const initialState = {
    loading: false,
    users: [],
    totalUsersNo: 0,
    user: {},
    usersFilterMode: "all",
    message: '',
    errors: {},
    status: 0,
    inputsState: {
      // associated_geofences: [
      // { geofence_id: 1, start_time: , end_time: , days: [1, 2, 3, 4,] }
    // ],
    },
  };
  const { logout } = useContext(AdminContext);
  const { addNotification } = useContext(NotificationsContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const [state, dispatch] = useReducer(userReducer, initialState);

  function setInput(e) {
    let inputsState = { ...state.inputsState };
    
    switch (e.target.name) {
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
        // associated_geofences: [],
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

  function setUsersFilterMode(mode) {
    dispatch({type:TYPES.SET_OBJECTS_FILTER_MODE, payload: {
      usersFilterMode: mode,
    }});
    console.log(mode);
  }

  const getAllUsers = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await UsersAPI.get(`/all`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("all users");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_ALL_OBJECTS, payload: { 
          users: response.data.users_data.users, 
          totalUsersNo: response.data.users_data.totalUsersNo, 
          usersFilterMode: "all", 
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

  const getUserById = async (id) => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await UsersAPI.get(`/get-user/${id}`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async(response)=> {
      console.log("get user");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_OBJECT_BY_ID, payload: { 
          user: response.data.user,
          inputsState: { ...response.data.user, ['associated_geofences']: response.data.user.associated_geofences.map((geofence) =>geofence.id)},
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

  const addUser = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This User will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        console.log(inputsState);
        dispatch({ type: TYPES.SET_LOADING });
        let userData = {
          name: inputsState.name,
          username: inputsState.username,
          email: inputsState.email,
          ID_type: inputsState.ID_type,
          formal_ID: inputsState.formal_ID,
          phone: inputsState.phone,
          associated_geofences: inputsState[`geofences`],
          association_details: inputsState.geofences ? inputsState.geofences.map((geofence_id, index) => {
            return {
              isPermanent: inputsState[`isPermanent_${geofence_id}`],
              schedule: inputsState[`schedule_${geofence_id}`],
              start_time: inputsState[`start_time_${geofence_id}`],
              end_time: inputsState[`end_time_${geofence_id}`],
            };
          }) : [],
        }
        console.log('userData');
        console.log(userData);
        const resp = await UsersAPI.post(`/add`, userData, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Add user");
            dispatch({ 
              type: TYPES.ADD_OBJECT, payload: { 
              message: response.data.message,
              status: response.data.status, 
              errors: {},
              }
            });
            addNotification({
              type: 'log',
              title: 'user_has_been_added',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/users/all`);
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/users/addUser`);
            })
          }
        });
      } else {
        swal("The user has not been added!");
      } 
    });
  };

  const updateUser = (id, inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This User will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willUpdate) => {
      if (willUpdate) {
        dispatch({ type: TYPES.SET_LOADING });
        console.log(inputsState);
        const resp = await UsersAPI.put(`/update/${id}`, inputsState, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Update User");
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
              title: 'user_has_been_updated',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/users/all`);
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/users/all`);
            })
          }
        });
      } else {
        swal("The user has not been updated!");
      }
    });
  };

  const deleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This User will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {  
        dispatch({ type: TYPES.SET_LOADING });  
        const resp = await UsersAPI.delete(`/delete/${id}`, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Delete User");
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({
              type: TYPES.DELETE_OBJECT, payload: { 
              message: response.data.message, 
              status: response.data.status ,
            }});
            await setAlert('pink', 'User has been deleted successfully');
            await getAllUsers();
            addNotification({
              type: 'log',
              title: 'user_has_been_deleted',
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/users/all`);
            })
          }
        });
      } else {
        swal("The user has not been deleted!");
      }
    });
  };

  return (
    <UsersContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,
        
        users: state.users,
        user: state.user,
        totalUsersNo: state.totalUsersNo,
        getAllUsers,
        getUserById,
        addUser,
        updateUser,
        deleteUser,
        
        usersFilterMode: state.usersFilterMode,
        setUsersFilterMode,
        
        inputsState: state.inputsState,
        setInput,
        resetAllInputs,
        resetAllErrors,

      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

const userReducer = (state, action) => {
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
        usersFilterMode: action.payload.usersFilterMode ? action.payload.usersFilterMode : "all",
      };

    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        users: action.payload.users  ? action.payload.users: [],
        totalUsersNo: action.payload.totalUsersNo  ? action.payload.totalUsersNo: 0,
        usersFilterMode: action.payload.usersFilterMode  ? action.payload.usersFilterMode: "all",
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.GET_OBJECT_BY_ID:
      return {
        ...state,
        user: action.payload.user ? action.payload.user: {},
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

export {UsersContext,UsersState };
