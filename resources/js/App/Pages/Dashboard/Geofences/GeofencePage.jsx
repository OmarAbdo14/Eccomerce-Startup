import React, { useContext, useEffect } from 'react'
import UsersTable from './Components/UsersTable'
import ScenariosTable from './Components/ScenariosTable';
import { GeofencesContext } from '../../../Context/GeofencesContext';
import { withRouter } from 'react-router-dom';
import Spinner from './../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const GeofencePage = ({match, current_lang}) => {
  const { getContent, content } = useContext(GeneralContext);
  const { loading, message, geofence, getGeofenceById } = useContext(GeofencesContext);
  
  useEffect(async () => {
    await getGeofenceById(match.params.id);
    await getContent();
  }, [match.params.id])
  
  return (
    <section className="w-11/12 mx-auto my-5">
      <div className="flex flex-col w-11/12 mx-auto rounded bg-white p-5">
        {loading && (
          <div className="flex flex-col justify-center items-center h-screen">
            <Spinner />
          </div>
        )}
        {!loading && content && message === 'Geofence has been returned successfully' && (
          <div className="geofence-content">
            <div className="geofence-header">
              <h3 className="geofence-title text-center font-extrabold md:text-lg text-base" id="exampleModalLabel">{geofence.name}</h3>
              <button type="button" className="btn-close" data-bs-dismiss="geofence" aria-label="Close"></button>
            </div>
            <div className="geofence-body text-left flex flex-col">
              
              {/* geofence-details */}
              <section id="geofence-details" className="w-full">
                <h4 className="font-bold md:text-lg text-left text-base text-blue-light capitalize">geofence details</h4>
                <div className="font-bold md:text-base text-sm">
                  <p className="">ID: <span className="text-gray-common">{ geofence.geofence_ID }</span></p>
                  <p className="">Type: <span className="text-gray-common">{ geofence.geofence_location_type ? "active" : "passive" }</span></p>
                  {geofence.geofence_location_type ? (<p className="">
                    Geometric Shape: <span className="text-gray-common">{ geofence.geofence_type }</span>
                  </p>) : null}
                  
                  <p className=""> </p>
                  
                </div>
              </section>
              
              {/* associated-users */}
              {geofence.associated_users && geofence.associated_users.length>=1 && geofence.scenarios && geofence.scenarios.length >= 1 && !geofence.scenarios.find((scenario) => scenario.geofence_type_id == 1)  && (
                <section id="associated-users" className="w-full mt-5">
                  <h4 className="font-bold md:text-lg text-left text-base -mb-8 text-blue-light capitalize">associated users</h4>
                  <UsersTable associated={true} users={ geofence.associated_users }/>
                </section>
              )}
          
              {/* current-users */}
              {geofence.current_users && geofence.current_users.length>=1 && (
                <section id="associated-users" className="w-full mt-5">
                  <h4 className="font-bold md:text-lg text-left text-base -mb-8 text-blue-light capitalize">current users</h4>
                  <UsersTable geofence={geofence} associated={false} users={ geofence.current_users }/>
                </section>
              )}

              {/* scenarios */}
              {/* {geofence.scenarios && geofence.scenarios.length>=1 && (
                <section id="associated-users" className="w-full mt-5">
                <h4 className="font-bold md:text-lg text-left text-base -mb-8 text-blue-light capitalize">scenarios</h4>
                  <ScenariosTable scenarios={ geofence.scenarios }/>
                </section>
              )} */}
                
            </div>      
          </div>
        )}
      </div>
    </section>
  )
}

export default withRouter(GeofencePage);
