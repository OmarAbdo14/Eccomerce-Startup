import React, {useEffect, useContext} from 'react'
import UsersTable from './Components/UsersTable';

import { UsersContext } from '../../../Context/UsersContext';
import Spinner from '../../../MainComponents/Spinner';
import Search from '../../../MainComponents/Search';
import { GeneralContext } from '../../../Context/GeneralContext';


const AllUsersPage = () => {
  const { loading, message, getAllUsers, users } = useContext(UsersContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllUsers();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All Users</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (
        <>
          {(!(users.length>=1) || message==='There is not any user') ? (
            <div className="flex flex-col justify-center items-center h-screen">
              <h1 className="text-center font-extrabold text-2xl">{`There is not any user`}</h1>
            </div>
          ) : null}
            
          {users.length >= 1 && message === 'All users has been returned successfully' ? (
            <>
              <Search array={users.map((user, index)=> {return user.current_geofence ? {...user, ...user.current_geofence } : user})} />
              <UsersTable />
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default AllUsersPage
