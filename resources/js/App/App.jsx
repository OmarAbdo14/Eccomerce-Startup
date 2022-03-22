import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { CMSState } from './Context/CMSContext';

import '../../css/app.css';
import Protected from './MainComponents/Protected';
import NotFound from './MainComponents/NotFound';
import LoginPage from './Pages/Login/LoginPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import ManagementSystem from './Pages/ManagementSystem/ManagementSystem';
import Notifications from './Pages/Notifications/NotificationsPage';
import Settings from './Pages/Settings/Settings';
import { AlertState } from './Context/AlertContext';
import { NotificationsState } from './Context/NotificationsContext';
import { SearchState } from './Context/SearchContext';
import { AdminContext, AdminState } from './Context/AdminContext';
import { AccountsState } from './Context/AccountsContext';
import { GeneralState } from './Context/GeneralContext';


import { IoT_devicesState } from './Context/IoT_devicesContext';
import { ScenariosState } from './Context/ScenariosContext';
import { GeofencesState } from './Context/GeofencesContext';
import { ActionsState } from './Context/ActionsContext';
import { UsersState } from './Context/UsersContext';
import { ReportsState } from './Context/ReportsContext';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import * as serviceWorker from './serviceWorker';
import Reports from './Pages/ManagementSystem/Reports/Reports';


function App() {
  const {setAuth, auth} = useContext(AdminContext);
  

  return (
    <>
      {console.log(JSON.parse($supportedLocales))}
      <div className='flex flex-col w-full'>
        {/* <Navbar/> */}
        <div className="flex flex-nowrap flex-row w-full mx-0">
          <Switch>
            <Route exact path={`/:current_lang/not-found`}>
              <NotFound current_lang={JSON.parse($supportedLocales).current_lang}/>
            </Route>
            
            <Route path={`/:current_lang/login`} >
              <LoginPage exact current_lang={JSON.parse($supportedLocales).current_lang}/>
            </Route>

            <Route path={`/:current_lang/dashboard`} >
              <Protected current_lang={JSON.parse($supportedLocales).current_lang}> <Dashboard current_lang={JSON.parse($supportedLocales).current_lang}/> </Protected> 
            </Route>

            <Route path={`/:current_lang/managementSystem`} >
              <Protected current_lang={JSON.parse($supportedLocales).current_lang}> <ManagementSystem current_lang={JSON.parse($supportedLocales).current_lang}/> </Protected> 
            </Route>
            
            <Route path={`/:current_lang/reports`} >
              <Protected current_lang={JSON.parse($supportedLocales).current_lang}> <Reports current_lang={JSON.parse($supportedLocales).current_lang}/> </Protected>
            </Route>
            
            <Route exact path={`/:current_lang/notifications`} >
              <Protected current_lang={JSON.parse($supportedLocales).current_lang}> <Notifications current_lang={JSON.parse($supportedLocales).current_lang}/> </Protected>
            </Route>

            <Route exact path={`/:current_lang/settings`} >
              <Protected current_lang={JSON.parse($supportedLocales).current_lang}> <Settings langs={ JSON.parse($supportedLocales) } /> </Protected>
            </Route>
            
            <Redirect to={`/${JSON.parse($supportedLocales).current_lang}/not-found`} />
          </Switch>
        </div>
      </div>
    </>);
}

export default App;

if(document.getElementById('root')) {
  ReactDOM.render(
    <Router>
      <AdminState>
        <CMSState>
          <AlertState>
            <NotificationsState>
              <GeneralState>
                <SearchState>
                  <AccountsState>
                    <ActionsState>
                      <IoT_devicesState>
                        <GeofencesState>
                          <UsersState>
                            <ScenariosState>
                              <ReportsState>
                                <App/>
                              </ReportsState>
                            </ScenariosState>
                          </UsersState>
                        </GeofencesState>
                      </IoT_devicesState>
                    </ActionsState>
                  </AccountsState>
                </SearchState>
              </GeneralState>
            </NotificationsState>
          </AlertState>
        </CMSState>
      </AdminState>
    </Router>
    , document.getElementById('root'))
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();