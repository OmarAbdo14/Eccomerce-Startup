import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import AddUserPage from './AddUserPage';
import UpdateUserPage from './UpdateUserPage';
import AllUsersPage from './AllUsersPage';


const Users = ({ current_lang }) => {

  return (
    <Switch>
      <Route exact path={`/${current_lang}/managementSystem/users/addUser`} >
        <AddUserPage />
      </Route>
      <Route exact path={`/${current_lang}/managementSystem/users/editUser/:id`} >
        <UpdateUserPage />
      </Route>
      <Route exact path={`/${current_lang}/managementSystem/users/all`}  >
        <AllUsersPage />
      </Route>
      
      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default Users

