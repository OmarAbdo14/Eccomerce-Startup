import React from 'react'
import Sidebar from './../../../MainComponents/Sidebar';
import GenerateReport from './GenerateReport';
import { Route, Switch } from 'react-router-dom';
import GeofenceReport from './Components/GeofenceReport';
import UserReport from './Components/UserReport';



const Reports = ({ current_lang, }) => {
  

  return (<>
    <Sidebar />
    <main className="bg-gray-light col px-0">
      <Switch>
        <Route exact path={`/${current_lang}/reports/generateReport`} >
          <GenerateReport current_lang={ current_lang } />
        </Route>

        <Route exact path={`/${current_lang}/reports/showReport/geofences`} >
          <GeofenceReport current_lang={ current_lang } />
        </Route>

        <Route exact path={`/${current_lang}/reports/showReport/users`} >
          <UserReport current_lang={ current_lang } />
        </Route>

      </Switch>
    </main>
  </>)
}

export default Reports

