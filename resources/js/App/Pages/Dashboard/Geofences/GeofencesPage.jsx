import React, {useContext, useEffect, useState} from 'react'
import GeofencesList from './Components/GeofencesList';
import { GeofencesContext } from '../../../Context/GeofencesContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { SearchContext } from '../../../Context/SearchContext';
import { GeneralContext } from '../../../Context/GeneralContext';

const GeofencesPage = ({ current_lang }) => {
  const { loading, message, getAllGeofences, geofences, getAllGeofenceTypes } = useContext(GeofencesContext);  
  const { getCommonObjects } = useContext(SearchContext);  
  const { getContent, content } = useContext(GeneralContext);
  const [dashboard_geofences, setGeofencesState] = useState([])

  useEffect(async () => {
    await getAllGeofenceTypes();
    await getAllGeofences();
    await getContent();


    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('7c45e6d131907ec8e7db', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('geofences', function(data) {
    // channel.bind("\App\Events\MessageSent", function(data) {
      console.log(data, 'data');
      let dashboard_geofences = data.geofences && data.geofences.length>=1 ? data.geofences.map((geofence, index)=> {return {...geofence, associated_users: data.associatedUsers && data.associatedUsers.length>=1 ? data.associatedUsers[index] : [] , responsible_users: data.responsibleUsers && data.responsibleUsers.length>=1 ? data.responsibleUsers[index] : [] , current_users: data.currentUsers && data.currentUsers.length>=1 ? data.currentUsers[index] : [] , IOTDevice: data.IOTDevice && data.IOTDevice.length>=1 ? data.IOTDevice[index] : [] , scenarios: data.scenarios && data.scenarios.length>=1 ? data.scenarios[index] : [] , points_list: data.points_list && data.points_list[index]}}) : geofences;
      console.log(dashboard_geofences, 'dashboard_geofences');
      setGeofencesState(dashboard_geofences);
    });
  }, []);

  return (
    <section className="w-11/12 mx-auto my-5">
      {(dashboard_geofences.length>=1) && content ? (<>
        <h1 className="text-lg font-bold text-blue-dark mb-5">{content.dashboard_title}</h1>
        <Search array={dashboard_geofences.map((geofence, index) => { return { ...geofence, ...geofence.user };})} />
        {(!(dashboard_geofences.length>=1) || message==='There is not any geofence') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`There is not any geofence`}</h1>
          </div>
        ) : null}
          
        {dashboard_geofences.length >= 1 && message === 'All geofences has been returned successfully' ? (<>  
          <div className='flex flex-row flex-wrap mt-5 gap-y-5 lg:justify-between justify-start -mx-2'>
            <GeofencesList geofences={dashboard_geofences} content={content}/>  
          </div>
        </>) : null}
      </>) : !(dashboard_geofences.length>=1) && content ? (<>
        <h1 className="text-lg font-bold text-blue-dark mb-5">{content.dashboard_title}</h1>
        <Search array={geofences.map((geofence, index) => { return { ...geofence, ...geofence.user };})} />
        {(!(geofences.length>=1) || message==='There is not any geofence') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`There is not any geofence`}</h1>
          </div>
        ) : null}
          
        {geofences.length >= 1 && message === 'All geofences has been returned successfully' ? (<>  
          <div className='flex flex-row flex-wrap mt-5 gap-y-5 lg:justify-between justify-start -mx-2'>
            <GeofencesList geofences={geofences} content={content}/>  
          </div>
        </>) : null}
      </>) : (<>
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      </>)}
    </section>

    // <div className="w-11/12 mx-auto my-5">
    //   <h1 className="text-lg text-blue-dark mb-5">All Geofences</h1>
    //   {loading ? (
    //     <div className="flex flex-col justify-center items-center h-screen">
    //       <Spinner />
    //     </div>
    //   ) : !loading && content && (<>
    //     {(!(geofences.length>=1) || message==='There is not any geofence') ? (
    //       <div className="flex flex-col justify-center items-center h-screen">
    //         <h1 className="text-center font-extrabold text-2xl">{`There is not any geofence`}</h1>
    //       </div>
    //     ) : null}
            
    //     {geofences.length >= 1 && message === 'All geofences has been returned successfully' ? (<>  
    //       <Tabs color="blue-dark" setFilterMode={setGeofencesFilterMode} tabs={[{name:'unassociated users', filterMode: 'unassociated'}, {name:'over capacity', filterMode: 'over-capacity'}, {name:'prohibited geofences', filterMode: 'prohibited'},]}/>
    //       <Search array={getCommonObjects(geofences.map((geofence, index)=> {return geofence.current_users ? geofence.current_users.map((user, index)=>{return {...geofence, ...{user_name:user.name, user_username: user.username, user_email: user.email, user_formal_ID: user.formal_ID}}}) : geofence}))} />
    //       <GeofencesList />
    //       <Statistics array={[
    //         {title: 'Total No. Of Geofences', body:geofences.length},
    //         {title: 'Total No. Of Over Capacity Geofences', body: geofences.filter((geofence) => geofence.scenarios.length >= 1 && (geofence.current_capacity_IoT
    //           ? geofence.current_capacity_IoT>geofence.scenarios.find((scenario) => scenario.capacity_limit != null).capacity_limit
    //           : geofence.current_capacity_system>geofence.scenarios.find((scenario) => scenario.capacity_limit != null).capacity_limit)).reduce((a, b) => a + b, 0)
    //         },
    //         { title: 'Total No. Of Unassociated Users', body: geofences.map((geofence) => geofence.current_users.filter((user, index) => geofence.asoociated_users 
    //         && geofence.asoociated_users.includes(user)).length).reduce((a, b) => a + b, 0) },]}
    //       />
    //     </>) : null}
    //   </>)}
    // </div>
  )
}

export default GeofencesPage
