import React, {useContext, useEffect, useState} from 'react'

import { ScenariosContext } from '../../../Context/ScenariosContext';
import Spinner from '../../../MainComponents/Spinner';
import { Link, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import DropdownSingleSearchList from '../../../MainComponents/DropdownSingleSearchList';
import DropdownMultipleSearchList from './../../../MainComponents/DropdownMultipleSearchList';
import { GeneralContext } from '../../../Context/GeneralContext';


const AddScenarioPage = () => {
  const { loading, getGeofences_Actions_GeofenceTypes, addService, removeService, addScenario, geofence_types, geofences, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(ScenariosContext);
  const { getContent, content } = useContext(GeneralContext);

  // const [selectedGeofence, setSelectedGeofence] = useState({})
  
  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getGeofences_Actions_GeofenceTypes();
    await getContent();
  }, []);

  async function addHandler(e) {
    e.preventDefault();
    await addScenario(inputsState);    
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
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Add Scenario</h1>
          <form onSubmit={(e)=>addHandler(e)} className="my-8 space-y-6 w-6/12" encType="multipart/form-data">            
            <input type="hidden" name="_method" value="POST" />
            <input type="hidden" name="remember" defaultValue="true" />

            {/* name   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="name" className="capitalize md:text-lg text-xs">
                  name:
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.name  ? inputsState.name : "" } 
                  id={`name`} name="name" type="text" placeholder="Enter Your Name" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.name}</span>)}
              </div>
            </div>

            {/* geofence   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="geofence_id" className="capitalize md:text-lg text-xs">
                  geofence: 
                </label>
                <DropdownSingleSearchList name="geofence_id" defaultArray={inputsState.geofence_id && geofences.length>=1 ? [geofences.filter(geofence => geofence.scenarios ? geofence.scenarios.find((scenario) => scenario.geofence_type_id == 1) == null : geofence).find((geofence)=>geofence.id===Number(inputsState.geofence_id))] : []} array={geofences.filter(geofence => geofence.scenarios ? geofence.scenarios.find((scenario) => scenario.geofence_type_id == 1) == null : geofence)} setInput={setInput} />
                {errors && (<span className="text-red-common p-3">{errors.geofence_id}</span>)}
              </div>
            </div>

            {/* geofence type   */}
            {inputsState.geofence_id && (
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="geofence_type_id" className="capitalize md:text-lg text-xs">
                    Select Geofence Type: 
                  </label>
                    <DropdownSingleSearchList name="geofence_type_id" defaultArray={inputsState.geofence_type_id ? [geofence_types.find((geofenceType) => geofenceType.id === Number(inputsState.geofence_type_id))] : []} array={geofences.find((geofence) => geofence.id === Number(inputsState.geofence_id)).associated_users.length >= 1 ? geofence_types : geofence_types.filter((type) => type.name !== 'associated')} setInput={setInput} />
                  {errors && (<span className="text-red-common p-3">{errors.geofence_type_id}</span>)}
                </div>
              </div>
            )}  

            {/* capacity limit   */}
            {inputsState.geofence_type_id && geofence_types.find((type) => type.id === Number(inputsState.geofence_type_id)).name==='limited' ? (<>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="capacity_limit" className="capitalize md:text-lg text-xs">
                    capacity limit: 
                  </label>
                  <input onChange={(e)=>setInput(e)} value={inputsState.capacity_limit  ? inputsState.capacity_limit : "" }  
                    id={`capacity_limit`} name="capacity_limit" type="text" placeholder="Enter Your Capacity Limit" 
                    className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                  />
                  {errors && (<span className="text-red-common p-3">{errors.capacity_limit}</span>)}
                </div>
              </div>
            </>) : null}

            {/* Services & Buffering   */}
            {inputsState.geofence_type_id && geofence_types.find((type) => type.id === Number(inputsState.geofence_type_id)).name==='service_zone' ? (<>
              {/* add or remove service */}
              <div className="flex flex-row justify-between w-full items-center">
                <label htmlFor="services" className="w-1/4 capitalize md:text-lg text-xs">
                  Services:
                </label>
                <div className="w-3/4 flex flex-row items-stretch justify-center">
                  <button type="button" onClick={addService} className="w-1/2 p-2 bg-blue-dark mx-1 text-white rounded capitalize">Add Service</button>
                  <button type="button" onClick={removeService} className="w-1/2 p-2 bg-red-500 text-white rounded capitalize">Remove Service</button>
                </div>      
              </div>

              {/* Services List */}
              {inputsState.services.map((el, index) => (
                <div key={index} className="rounded-md shadow-sm -space-y-px">
                  <div className="mt-4">
                    <input onChange={(e)=>setInput(e, index)} value={(inputsState.services[index] && inputsState.services.length!==0) ? inputsState.services[index] : "" } 
                      id={`services`} name={`services`} type="text" placeholder={`Service${index+1}`} 
                      className=" bg-blue-thin p-2 border w-full md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    />
                    {errors && (<span className="text-red-common p-3">{errors.services}</span>)}
                  </div>
                </div>
              ))}

              {/* buffering geofence   */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="buffering_geofence_id" className="capitalize md:text-lg text-xs">
                    Buffering Geofence: 
                  </label>
                  <DropdownSingleSearchList name="buffering_geofence_id" defaultArray={inputsState.buffering_geofence_id && geofences.length>=1 ? [geofences.find((geofence)=>geofence.id===Number(inputsState.buffering_geofence_id))] : []} array={geofences.filter((geofence)=>geofence.id!=Number(inputsState.geofence_id))} setInput={setInput} />
                  {errors && (<span className="text-red-common p-3">{errors.buffering_geofence_id}</span>)}
                </div>
              </div>
            </>) : null}
              
            {/* actions   */}
            {inputsState.geofence_type_id && (
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="actions" className="capitalize md:text-lg text-xs">
                    actions: 
                  </label>
                  <DropdownMultipleSearchList name="actions" defaultArray={[]} array={geofence_types.find((type)=>{return type.id === Number(inputsState.geofence_type_id)}).actions} setInput={setInput} />
                  {errors && (<span className="text-red-common p-3">{errors.actions}</span>)}
                </div>
              </div>
            )}

            {/* Submit   */}
            <div>
              <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Scenario
              </button>
            </div>
          </form> 
        </div>
      </>) : null}
    </section>
    </>
  );
}


export default AddScenarioPage
