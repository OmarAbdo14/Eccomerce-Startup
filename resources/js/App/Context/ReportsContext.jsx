import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from 'sweetalert';
import * as TYPES from "./types";
import { API } from '../API';
import { NotificationsContext } from "./NotificationsContext";
import { AdminContext } from "./AdminContext";

const ReportsContext = React.createContext();
const ReportsState = (props) => {
  const { logout } = useContext(AdminContext);
  const { addNotification } = useContext(NotificationsContext);
  const history = useHistory();
  
  const initialState = {
    loading: false,
    status: 0,
    message: '',
    errors: {},
    current_report_type: '',
    report_users: {},
    report_geofences: {},
    inputsState: {},
  };

  const [state, dispatch] = useReducer(generalReducer, initialState);

  function setInput(e) {
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

  function resetAllInputs() {
    dispatch({type:TYPES.RESET_ALL_INPUTS, payload: {
      inputsState: {},
    }});
  }

  const generateReport = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This Report will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        console.log(inputsState);
        dispatch({ type: TYPES.SET_LOADING });
  
        const resp = await API.post(`/admin/generate-report`, inputsState, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Generate Report");
            console.log(response.data);
            // Cookies.set('admin', JSON.stringify(response.data.admin));
            dispatch({ 
              type: TYPES.ADD_OBJECT, payload: { 
              report_users: response.data.report_users ? response.data.report_users : {},
              report_geofences: response.data.report_geofences ? response.data.report_geofences : {},
              current_report_type: response.data.report_type,
              message: response.data.message,
              status: response.data.status, 
              errors: {},
              }
            });
            addNotification({
              type: 'log',
              title: 'report_has_been_added',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/reports/showReport/${response.data.report_type}`);
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
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/reports/showReport/${inputsState.report_type}`);
            })
          }
        });
      } else {
        swal("The report has not been added!");
      } 
    });
  };
  
  return (
    <ReportsContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,
        resetAllErrors,
        resetAllInputs,

        inputsState: state.inputsState,
        setInput,

        current_report_type: state.current_report_type,
        report_users: state.report_users,
        report_geofences: state.report_geofences,
        generateReport,
      }}
    >
      {props.children}
    </ReportsContext.Provider>
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
    
    case TYPES.ADD_OBJECT:
      return {
        ...state,
        current_report_type: action.payload.current_report_type ? action.payload.current_report_type : {},
        report_users: action.payload.report_users ? action.payload.report_users : {},
        report_geofences: action.payload.report_geofences ? action.payload.report_geofences : {},
        message: action.payload.message,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
      };
    default:
      return state;
  }
};

export { ReportsContext, ReportsState };
