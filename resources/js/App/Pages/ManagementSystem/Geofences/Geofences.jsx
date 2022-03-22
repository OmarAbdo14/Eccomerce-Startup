import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddGeofencePage from './AddGeofencePage';
import GeofenceMatchingPage from './GeofenceMatchingPage';
import UpdateGeofencePage from './UpdateGeofencePage';
import AllGeofencesPage from './AllGeofencesPage';


const Geofences = ({ current_lang }) => {
  
  return (
    <Switch>
      <Route path={`/${current_lang}/managementSystem/geofences/addGeofence`} >
        <AddGeofencePage />
      </Route>

      <Route path={`/${current_lang}/managementSystem/geofences/geofenceMatching`} >
        <GeofenceMatchingPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/geofences/editGeofence/:id`} >
        <UpdateGeofencePage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/geofences/all`}  >
        <AllGeofencesPage /> 
      </Route>

      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default Geofences
