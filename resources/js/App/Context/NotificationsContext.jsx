import React, { useReducer, useContext } from "react";
import * as TYPES from "./types";
import swal from 'sweetalert';
import { NotificationsAPI } from '../API';
import { useHistory } from 'react-router-dom';
import { AlertContext } from "./AlertContext";
import Cookies from "js-cookie";

const NotificationsContext = React.createContext();

const NotificationsState = (props) => {
  const initialState = {
    loading: false,
    notifications: [],
    totalNotificationsNo: 0,
    notificationsFilterMode: "all",
    
    message: '',
    errors: {},
    status: 0,
  };

  const history = useHistory();
  
  const { setAlert } = useContext(AlertContext);

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  function setNotificationsFilterMode(mode) {
    dispatch({type:TYPES.SET_OBJECTS_FILTER_MODE, payload: {
      notificationsFilterMode: mode,
    }});
    console.log(mode);
  }
  
  const getAllNotifications = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await NotificationsAPI.get(`/all`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async (response)=> {
      console.log("all notifications");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.notifications_data) {
        dispatch({ 
          type: TYPES.GET_ALL_NOTIFICATIONS, payload: { 
          notifications: response.data.notifications_data, 
          notificationsFilterMode: "all", 
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
          type: TYPES.GET_ALL_NOTIFICATIONS, payload: {  
          message: response.data.message,
          status: response.data.status, 
        }});  
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

  function addNotification(request) {
    // dispatch({ type: TYPES.SET_LOADING });
    const resp = NotificationsAPI.post('/add', request, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then((response) => {
      dispatch({ 
        type: TYPES.ADD_OBJECT, payload: { 
        message: response.data.message, 
        status: response.data.status ,
      }});
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        console.log(error);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      }
    })
  }

  const deleteNotification = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This notification will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) { 
        dispatch({ type: TYPES.SET_LOADING });
    
        const resp = await NotificationsAPI.delete(`/delete/${id}`, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async(response)=> {
          console.log("Delete notifiaction");
          if(response.hasOwnProperty('data')) {
            dispatch({ 
              type: TYPES.DELETE_OBJECT, payload: { 
              message: response.data.message, 
              status: response.data.status ,
            }});
            await setAlert('pink',  'Notification has been deleted successfully');
            await getAllNotifications();
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
      } else {
        swal("The notification has not been deleted!");
      }
    });
  };


  return (
    <NotificationsContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,
        
        notifications: state.notifications,
        notificationsFilterMode: state.notificationsFilterMode,
        setNotificationsFilterMode,
        getAllNotifications,
        addNotification,
        deleteNotification,

      }}
    >
      {props.children}
    </NotificationsContext.Provider>
  );
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TYPES.SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      }
    
    case TYPES.VALIDATION_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
      };

    case TYPES.SET_OBJECTS_FILTER_MODE:
      return {
        ...state,
        notificationsFilterMode: action.payload.notificationsFilterMode ? action.payload.notificationsFilterMode : "all",
      };
    
    case TYPES.GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications  ? action.payload.notifications: [],
        totalNotificationsNo: action.payload.totalNotificationsNo  ? action.payload.totalNotificationsNo: 0,
        notificationsFilterMode: action.payload.notificationsFilterMode  ? action.payload.notificationsFilterMode: "all",
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.ADD_OBJECT:
      return {
        ...state,
        message: action.payload.message,
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

export { NotificationsContext, NotificationsState };
