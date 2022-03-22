import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddScenarioPage from './AddScenarioPage';
import UpdateScenarioPage from './UpdateScenarioPage';
import AllScenariosPage from './AllScenariosPage';


const Scenarios = ({ current_lang }) => {
  
  return (
    <Switch>
      <Route path={`/${current_lang}/managementSystem/scenarios/addScenario`} >
        <AddScenarioPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/scenarios/editScenario/:id`} >
        <UpdateScenarioPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/scenarios/all`}  >
        <AllScenariosPage /> 
      </Route>

      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default Scenarios
