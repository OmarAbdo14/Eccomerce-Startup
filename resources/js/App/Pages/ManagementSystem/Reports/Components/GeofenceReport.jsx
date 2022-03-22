import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { GeneralContext } from '../../../../Context/GeneralContext';
import { ReportsContext } from '../../../../Context/ReportsContext';
import Spinner from './../../../../MainComponents/Spinner';
import UsersTable from './UsersTable';

const GeofenceReport = ({match, current_lang}) => {
  const { getContent, content } = useContext(GeneralContext);
  const { loading, report_geofences } = useContext(ReportsContext);
  
  useEffect(async () => {
    await getContent();
  }, [])
  
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');
  console.log(report_geofences, 'report_geofences');

  return (
    <section className="w-11/12 mx-auto my-5">
      <div className="flex flex-col w-11/12 mx-auto rounded bg-white p-5">
        {report_geofences.map((report_geofence)=> (<>
          <div className="report_geofence-content">
            <div className="report_geofence-header">
              <h3 className="report_geofence-title text-center font-extrabold md:text-lg text-base" id="exampleModalLabel">{report_geofence.name}</h3>
              <button type="button" className="btn-close" data-bs-dismiss="report_geofence" aria-label="Close"></button>
            </div>
            <div className="report_geofence-body text-left flex flex-col">
              {/* report_geofence-details */}
              <section id="report_geofence-details" className="w-full">
                <h4 className="font-bold md:text-lg text-left text-base text-blue-light capitalize">Geofence details</h4>
                <div className="font-bold md:text-base text-sm">
                  <p className="">Capacity: <span className="text-gray-common">{ report_geofence.capacity }</span></p>
                  <p className="">ID: <span className="text-gray-common">{ report_geofence.geofence.geofence_type }</span></p>
                  <p className="">Type: <span className="text-gray-common">{ report_geofence.geofence.geofence_type ? "active" : "passive" }</span></p>
                  {report_geofence.geofence.geofence_location_type ? (<p className="">
                    Geometric Shape: <span className="text-gray-common">{ report_geofence.geofence.geofence_type }</span>
                  </p>) : null}
                </div>
              </section>

              {/* current-users */}
              {report_geofence.geofence_users && report_geofence.geofence_users.length>=1 && (
                <section id="associated-users" className="w-full mt-5">
                  <h4 className="font-bold md:text-lg text-left text-base -mb-8 text-blue-light capitalize">current users</h4>
                  <UsersTable report_geofence={report_geofence} associated={false} users={ report_geofence.geofence_users }/>
                </section>
              )}

            </div>      
          </div>
        </>))}
      </div>
    </section>
  )
}

export default withRouter(GeofenceReport);
