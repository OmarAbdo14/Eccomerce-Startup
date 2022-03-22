import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

import Sidebar from '../../MainComponents/Sidebar'
import GeofencePage from './Geofences/GeofencePage';
import GeofencesPage from './Geofences/GeofencesPage';

const Dashboard = ({ content, current_lang }) => {
  
  // window.setTimeout(function () {
  //   window.location.reload();
  // }, 2000);

  return (<>
    <Sidebar />
    <main className="bg-gray-light col px-0">
      <Switch>
        <Route path={`/:current_lang/dashboard/geofences/geofence/:id`}>
          <GeofencePage current_lang={ current_lang }/>
        </Route>
        
        <Route exact path={`/:current_lang/dashboard/geofences/all`}>
          <GeofencesPage current_lang={ current_lang }/>
        </Route> 

        <Redirect to={`/:current_lang/not-found`} />
      </Switch>
    </main>
  </>)
}

export default Dashboard

