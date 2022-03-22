import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import Sidebar from '../../MainComponents/Sidebar';
import Accounts from './Accounts/Accounts';
import IoTDevices from './IoTDevices/IoTDevices';
import Actions from './Actions/Actions';
import Geofences from './Geofences/Geofences';
import Scenarios from './Scenarios/Scenarios';
import Users from './Users/Users';
import { GoogleMapsState } from '../../Context/GoogleMapsContext';


const ManagementSystem = ({ current_lang }) => {

  return (
    <div className="row flex-nowrap w-full mx-0">
      <Sidebar />
      <main className="bg-gray-light col px-0">
        <Switch>
          <Route path={`/${current_lang}/managementSystem/IoT_devices`} >
            <IoTDevices current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/geofences`} >
            <GoogleMapsState>
              <Geofences current_lang={ current_lang } />
            </GoogleMapsState>
          </Route>

          <Route path={`/${current_lang}/managementSystem/users`} >
            <Users current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/actions`} >
            <Actions current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/scenarios`} >
            <Scenarios current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/accounts`} >
            <Accounts current_lang={ current_lang } />
          </Route>

          <Redirect to={`/${current_lang}/not-found`} />
        </Switch>
      </main>
    </div>
  )
}

export default ManagementSystem

