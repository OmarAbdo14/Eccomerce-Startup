import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddActionPage from './AddActionPage';
import UpdateActionPage from './UpdateActionPage';
import AllActionsPage from './AllActionsPage';


const Actions = ({ current_lang }) => {
  
  return (
    <Switch>
      <Route path={`/${current_lang}/managementSystem/actions/addAction`} >
        <AddActionPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/actions/editAction/:id`} >
        <UpdateActionPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/actions/all`}  >
        <AllActionsPage /> 
      </Route>

      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default Actions
