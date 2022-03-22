import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddIoTDevicePage from './AddIoTDevicePage';
import UpdateIoTDevicePage from './UpdateIoTDevicePage';
import AllIoTDevicesPage from './AllIoTDevicesPage';


const IoTDevices = ({ current_lang }) => {

  return (
    <Switch>
      <Route path={`/${current_lang}/managementSystem/IoT_devices/addIoT_device`} >
        <AddIoTDevicePage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/IoT_devices/editIoT_device/:id`} >
        <UpdateIoTDevicePage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/IoT_devices/all`}  >
        <AllIoTDevicesPage /> 
      </Route>

      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default IoTDevices
