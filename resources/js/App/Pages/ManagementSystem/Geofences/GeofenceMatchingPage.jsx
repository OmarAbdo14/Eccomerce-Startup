import { ArrowRightIcon } from '@heroicons/react/solid';
import React, {useContext, useEffect, useRef} from 'react'

import { GeofencesContext } from '../../../Context/GeofencesContext';
import Spinner from '../../../MainComponents/Spinner';
import { Link } from 'react-router-dom';
import LocationSearchModal from '../../../MainComponents/LocationSearchModal';
import DropdownMultipleSearchList from './../../../MainComponents/DropdownMultipleSearchList';
import DropdownSingleSearchList from './../../../MainComponents/DropdownSingleSearchList';
import { GeneralContext } from '../../../Context/GeneralContext';


const GeofenceMatchingPage = () => {
  const { loading, getAllGeofenceMatchingData, geofences, IOTDevices, users, errors, MatchGeofenceData, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(GeofencesContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getAllGeofenceMatchingData();
    await getContent();

  }, []);

  async function addHandler(e) {
    e.preventDefault();
      MatchGeofenceData({
        IOTDevice_id: inputsState.IOTDevice_id,
        geofence_id: inputsState.geofence_id,
        associated_users: inputsState.associated_users,
        responsible_users: inputsState.responsible_users,
      });
  };


  return (
    <>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
      {!loading && content && inputsState ? (<>
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Geofence Matching</h1>
          <form onSubmit={(e)=>addHandler(e)} className="my-8 space-y-6 w-8/12" encType="multipart/form-data">            
            <input type="hidden" name="_method" value="PUT" />
            <input type="hidden" name="remember" defaultValue="true" />
              
            {/* Geofence ID */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="geofence_id" className="capitalize md:text-lg text-xs">
                  geofence: 
                </label>
                <DropdownSingleSearchList name="geofence_id" defaultArray={[]} array={geofences && geofences.length>=1 ? geofences.filter(geofence => geofence.scenarios ? geofence.scenarios.find((scenario) => scenario.geofence_type_id == 1) == null : geofence) : []} setInput={setInput} />  
                {errors && (<span className="text-red-common p-3">{errors.geofence_id}</span>)}
              </div>
            </div>
              
            {inputsState.geofence_id && (<>
              {/* IoT Device */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="IOTDevice_id" className="capitalize md:text-lg text-xs">
                    IoT Device: 
                  </label>
                  <DropdownSingleSearchList name="IOTDevice_id" defaultArray={[]} array={IOTDevices && IOTDevices.length>=1 ? IOTDevices : []} setInput={setInput} />
                  {errors && (<span className="text-red-common p-3">{errors.IOTDevice_id}</span>)}
                </div>
              </div>

              {/* Associated Users list   */}
              <div className="rounded-md -space-y-px flex  flex-wrap flex-col">
                <label htmlFor="assiciated_users" className="capitalize md:text-lg text-xs">
                  Associate Users: 
                </label>
              
                <DropdownMultipleSearchList  name='associated_users' defaultArray={[]} array={users && users.length>=1 ? users : []} setInput={setInput} />
                {errors && (<span className="text-red-common p-3">{errors.associated_users}</span>)}
              </div>

              {/* Responsible Users list   */}
              <div className="rounded-md -space-y-px flex  flex-wrap flex-col">
                <label htmlFor="responsible_users" className="capitalize md:text-lg text-xs">
                  Responsible Users For Monitoring: 
                </label>
              
                <DropdownMultipleSearchList  name='responsible_users' defaultArray={[]} array={users && users.length>=1 ? users : []} setInput={setInput} />
                {errors && (<span className="text-red-common p-3">{errors.responsible_users}</span>)}
              </div>

            </>)}

            <div>
              <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </form> 
        </div>
      </>) : null}
    </section>
    </>
  );
}


export default GeofenceMatchingPage
