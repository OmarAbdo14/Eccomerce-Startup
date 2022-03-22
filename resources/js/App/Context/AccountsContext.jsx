import React, { useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from 'sweetalert';
import * as TYPES from "./types";
import { AccountsAPI } from '../API';
import { NotificationsContext } from './NotificationsContext';
import { AlertContext } from "./AlertContext";
import { AdminContext } from "./AdminContext";

const AccountsContext = React.createContext();
const AccountsState = (props) => {
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
    admin: {},
    account: {},
    accounts: [],
    totalAccountsNo: 0,
    accountsFilterMode: "all",
    inputsState: {
      // password: '',
      // identifier: '',
      // roles: [],
      // full_name: '',
      // image: null,
    },
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  async function setInput(e) {
    let inputsState = { ...state.inputsState };
    switch (e.target.name) {
      case 'image':  
        inputsState = { ...inputsState, [e.target.name]: e.target.files[0], }
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

  function setAccountsFilterMode(mode) {
    dispatch({type:TYPES.SET_OBJECTS_FILTER_MODE, payload: {
      accountsFilterMode: mode,
    }});
    console.log(mode);
  }

  const getAllAccounts = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await AccountsAPI.get(`/all`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` }
    }).then(async (response) => {
      console.log("all accounts");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({ 
          type: TYPES.GET_ALL_OBJECTS, payload: { 
            accounts: response.data.accounts_data.accounts, 
            totalAccountsNo: response.data.accounts_data.totalAccountsNo, 
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

  const addAccount = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This account will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        dispatch({ type: TYPES.SET_LOADING });
  
        const resp = await AccountsAPI.post(`/register`, inputsState, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Add account");
            dispatch({ 
              type: TYPES.ADD_OBJECT, payload: { 
              message: response.data.message,
              status: response.data.status, 
              errors: {},
            }});
            addNotification({
              type: 'log',
              title: 'account_has_been_added',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/accounts/all`);
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
            }).then(async (value) => {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/accounts/addaccount`);
            });
          }
        }); 
      } else {
        swal("The account has not been added!");
      }
    });
  };

  const getAccountById = async (id) => {
    dispatch({ type: TYPES.SET_LOADING });
  
    const resp = await AccountsAPI.get(`/get-account/${id}`, {
      params: { id: id },
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
    }).then(async (response) => {
      console.log("get account");
      console.log(response.data);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({ 
          type: TYPES.GET_OBJECT_BY_ID, payload: { 
          account: response.data.account, 
          inputsState: response.data.account, 
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
  
  const updateAccount = async (id, inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This account will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willAdd) => {
      if (willAdd) {
        dispatch({ type: TYPES.SET_LOADING });
        console.log('aaa', inputsState);
        const resp = await AccountsAPI.post(`/update/${id}`, inputsState, {
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
              title: 'account_has_been_updated',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async (value) => {  
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/accounts/all`);
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
            }).then(async (value) => {
              history.replace(`/${JSON.parse($supportedLocales).current_lang}/managementSystem/accounts/editAccount/${id}`);
            });
          }
        });
      } else {
        swal("The account has not been updated!");
      }
    });
  };

  const deleteAccount = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This Account will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {  
        dispatch({ type: TYPES.SET_LOADING });  
        const resp = await AccountsAPI.delete(`/delete/${id}`, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).api_token.access_token}` },
        }).then(async (response) => {
          console.log("Delete Account");
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({
              type: TYPES.DELETE_OBJECT, payload: { 
              message: response.data.message, 
              status: response.data.status ,
            }});
            await setAlert('green', 'Account has been deleted successfully');
            await getAllAccounts();
            addNotification({
              type: 'log',
              title: 'Account_has_been_deleted',
              description: `${JSON.parse(Cookies.get('admin')).username}`,
              image: JSON.parse(Cookies.get('admin')).image ? JSON.parse(Cookies.get('admin')).image : null,
            });
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
            await logout();
            history.replace('/login');
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
            }).then(async(value)=> {
              history.replace('/managementSystem/Accounts/all');
            })
          }
        });
      } else {
        swal("The Account has not been deleted!");
      }
    });
  };


  return (
    <AccountsContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,

        account: state.account,
        accountsFilterMode: state.accountsFilterMode,
        accounts: state.accounts,
        totalAccountsNo: state.totalAccountsNo,
        setAccountsFilterMode,
        getAllAccounts,
        getAccountById,
        addAccount,
        updateAccount,
        deleteAccount,
        
        inputsState: state.inputsState,        
        setInput,
        resetAllInputs,
        resetAllErrors,
        
      }}
    >
      {props.children}
    </AccountsContext.Provider>
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
      };  
    case TYPES.LOGIN:
      return {
        ...state,
        loading: false,
        auth: action.payload.auth ? action.payload.auth : false,
        status: action.payload.status,
        message: action.payload.message,
        errors: action.payload.errors ? action.payload.errors : {},
        admin: action.payload.admin ? action.payload.admin : {},
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
    
    case TYPES.ADD_OBJECT:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        errors: action.payload.errors,
        registerInputsState: action.payload.registerInputsState,
      };
    case TYPES.UPDATE_OBJECT:
      return {
        ...state,
        message: action.payload.message,
        registerInputsState: action.payload.registerInputsState,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.SET_OBJECTS_FILTER_MODE:
      return {
        ...state,
        accountsFilterMode: action.payload.accountsFilterMode ? action.payload.accountsFilterMode : "all",
      };
    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        accounts: action.payload.accounts  ? action.payload.accounts: [],
        totalAccountsNo: action.payload.totalAccountsNo  ? action.payload.totalAccountsNo: 0,
      };
    case TYPES.GET_OBJECT_BY_ID:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        account: action.payload.account ? action.payload.account: {},
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

export { AccountsContext, AccountsState };
