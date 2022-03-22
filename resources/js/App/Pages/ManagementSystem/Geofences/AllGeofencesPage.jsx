import React, {useEffect, useContext} from 'react'
import GeofencesTable from './Components/GeofencesTable';

import { GeofencesContext } from '../../../Context/GeofencesContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { SearchContext } from '../../../Context/SearchContext';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllGeofencesPage = () => {
  const { loading, message, getAllGeofences, geofences } = useContext(GeofencesContext);  
  const { getCommonObjects } = useContext(SearchContext);  
  const { getContent, content } = useContext(GeneralContext);


  useEffect(async () => {
    await getAllGeofences();
    await getContent();

  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All Geofences</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (
        <>
          {(!(geofences.length>=1) || message==='There is not any geofence') ? (
            <div className="flex flex-col justify-center items-center h-screen">
              <h1 className="text-center font-extrabold text-2xl">{`There is not any geofence`}</h1>
            </div>
          ) : null}
            
          {geofences.length >= 1 && message === 'All geofences has been returned successfully' ? (<>
            <Search array={getCommonObjects(geofences.map((geofence, index)=> {return geofence.current_users ? geofence.current_users.map((user, index)=>{return {...geofence, ...{user_name:user.name, user_username: user.username, user_email: user.email, user_formal_ID: user.formal_ID}}}) : geofence}))} />
            <GeofencesTable />
          </>) : null}
        </>
      )}
    </div>
  )
}

export default AllGeofencesPage
