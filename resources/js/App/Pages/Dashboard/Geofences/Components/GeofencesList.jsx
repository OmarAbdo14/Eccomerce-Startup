import React, {useContext, useEffect} from 'react'

import { GeofencesContext } from '../../../../Context/GeofencesContext';
import { SearchContext } from '../../../../Context/SearchContext';
import { Link } from 'react-router-dom';
import { GeneralContext } from '../../../../Context/GeneralContext';

const GeofencesList = ({current_lang, geofences}) => {
  const { loading } = useContext(GeofencesContext);
  const { searchResult, search } = useContext(SearchContext);
  const { content } = useContext(GeneralContext);
  
  // function getArraysIntersection(a1,a2){
  //   return  a1.filter(function(n) { return a2.indexOf(n) !== -1;});
  // }    
  const checkUnassociationViolation = (current_users, associated_users) => {
    let currentAssociatedUsers = current_users && current_users.filter(o1 => associated_users.some(o2 => o1.id === o2.id));
    if (currentAssociatedUsers && currentAssociatedUsers.length !== current_users.length) {
      return isAssociationExpired(current_users);
    }
    return false;
  };

  const isAssociationExpired = (current_users)=> {
    let flag = false;
    current_users.forEach(user => {
      if(user.association_details && user.association_details.is_associated_now==false) {
        flag = true;
        // break;
      }
    });
    return flag;
  };
  
  useEffect(async () => {
    await search(document.getElementById('searchInput').value ? document.getElementById('searchInput').value : '', geofences);
  }, []);
  
  useEffect(async () => {
    console.log(geofences, 'before search');
    console.log(geofences, 'before search');
    await search(document.getElementById('searchInput').value ? document.getElementById('searchInput').value : '', geofences)
  }, [geofences]);
  
  console.log('searchResult', searchResult);
  const currentGeofences = [...searchResult];
  const notProhibetedGeofences = currentGeofences.filter(geofence => geofence.scenarios ? geofence.scenarios.find((scenario) => scenario.geofence_type_id == 1) == null : geofence);
  const geofencesCols = [
    // prohibited violation geofenceTypes.find(type=> type.name==='prohibited').id
    currentGeofences.filter(geofence=> geofence.scenarios && geofence.scenarios.length >= 1 && geofence.scenarios.find((scenario) => scenario.geofence_type_id == 1) && geofence.current_users && geofence.current_users.length>=1),
    // unassociation violation
    notProhibetedGeofences.filter(geofence=> checkUnassociationViolation(geofence.current_users, geofence.associated_users)),
    // over capacity violation
    notProhibetedGeofences.filter((geofence) => geofence.scenarios && geofence.scenarios.length >= 1 && (geofence.current_capacity_IoT
      ? geofence.current_capacity_IoT>(geofence.scenarios.find((scenario) => scenario.capacity_limit != null) && geofence.scenarios.find((scenario) => scenario.capacity_limit != null).capacity_limit)
      : geofence.current_users.length>(geofence.scenarios.find((scenario) => scenario.capacity_limit != null) && geofence.scenarios.find((scenario) => scenario.capacity_limit != null).capacity_limit))),
  ];
  console.log('geofencesCols', geofencesCols);
  const titles = [content.geofence_status_normal, content.geofence_status_outdoor, content.geofence_status_unpaired, content.geofence_status_offline];
  const colors = ['red-400', 'yellow-400', 'gray-400'];
  
  return (<>
    {geofencesCols.map((geofences, index) => (
      <section key={index} className="md:w-1/4 sm:w-1/2 w-full px-2">
        <h3 className={`border-l-4 px-1.5 border-${colors[index]} md:text-xl sm:text-lg text-base`}>{titles[index]} ({geofences.length})</h3>
        <div className='flex flex-col gap-y-2 mt-4'>
          {geofences.map((geofence, index) => (
            <Link key={index}
              to={`/${current_lang}/dashboard/geofences/geofence/${geofence.id}`}
              className={`geofence h-40 text-left p-3 bg-white rounded-xl shadow-md `}>
              <h4 className="text-dark font-bold md:text-xl text-lg">{geofence.name}</h4>
              {geofence.current_capacity_IoT ? (<>
                <p className="font-weight-bold text-blue-dark md:text-xl text-lg">Current Capacity<br />({geofence.current_capacity_IoT})</p>
              </>) : geofence.current_users ? (<>
                <p className="font-weight-bold text-blue-dark md:text-xl text-lg">Current Capacity<br />({geofence.current_users.length})</p>
              </>) : (<>
                <p className="font-weight-bold text-blue-dark md:text-xl text-lg">Current Capacity<br />(0)</p>
              </>)}
              
            </Link>
          ))}
        </div>
      </section>
    ))}
  </>);
  
}

export default GeofencesList;
