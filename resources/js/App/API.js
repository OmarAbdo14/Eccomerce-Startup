import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://wms.cardi-hu.com/api/auth';

export const API = axios.create({
  baseURL: `${baseURL}`,
  data: {
    // "api_password":"145",
  }
})

export const NotificationsAPI = axios.create({
  baseURL: `${baseURL}/admin/notifications`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
})

export const AccountsAPI = axios.create({
  baseURL: `${baseURL}/admin/accounts`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
})

export const IoT_devicesAPI = axios.create({
  baseURL: `${baseURL}/admin/IoT_devices`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
})

export const ActionsAPI = axios.create({
  baseURL: `${baseURL}/admin/actions`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
})

export const GeofencesAPI = axios.create({
  baseURL: `${baseURL}/admin/geofences`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
})

export const ScenariosAPI = axios.create({
  baseURL: `${baseURL}/admin/scenarios`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
})

export const UsersAPI = axios.create({
  baseURL: `${baseURL}/admin/users`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
})


