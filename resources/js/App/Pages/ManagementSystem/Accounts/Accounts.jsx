import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import AddAccountPage from './AddAccountPage';
import UpdateAccountPage from './UpdateAccountPage';
import AllAccountsPage from './AllAccountsPage';


const Accounts = ({ current_lang }) => {
  
  return (
    <Switch>
      <Route exact path={`/${current_lang}/managementSystem/accounts/addAccount`} >
        <AddAccountPage />
      </Route>
      <Route exact path={`/${current_lang}/managementSystem/accounts/editAccount/:id`} >
        <UpdateAccountPage />
      </Route>
      <Route exact path={`/${current_lang}/managementSystem/accounts/all`}  >
        <AllAccountsPage />
      </Route>
      
      <Redirect to={`/${current_lang}/not-found`} />
    </Switch>
  )
}

export default Accounts

