import React, {useContext, useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom';
import { GeneralContext } from '../../../Context/GeneralContext';

import { GeofencesContext } from '../../../Context/GeofencesContext';
import DropdownSingleSearchList from '../../../MainComponents/DropdownSingleSearchList';
import Spinner from '../../../MainComponents/Spinner';



const UpdateGeofencePage = ({match}) => {
  const { loading, addPoint, removePoint, getGeofenceById, updateGeofence, message, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(GeofencesContext);
  const { getContent, content } = useContext(GeneralContext);  

  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getGeofenceById(match.params.id);
    await getContent();
  }, []);

  async function updateHandler(e) {
    e.preventDefault();
    if(inputsState.geofence_location_type === 'passive') {
      let formData = new FormData();
      formData.append("name", inputsState.name);
      formData.append("geofence_ID", inputsState.geofence_ID);
      formData.append("geofence_type", inputsState.geofence_type);
      formData.append("geofence_location_type", 0);
      formData.append("preprocessing_file", inputsState.preprocessing_file);
      await updateGeofence(match.params.id, formData);  
    } else {
      await updateGeofence(match.params.id, inputsState);
    }
    
  };
  
  return (
    <>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {!loading && message === 'This geofence is not exist' && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`This geofence is not exist`}</h1>
        </div>
      )}
      
      {!loading && content && inputsState && (
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Update Geofence</h1>
          <form onSubmit={(e)=>updateHandler(e)} className="my-8 space-y-6 w-6/12" encType="multipart/form-data">            
            <input type="hidden" name="_method" value="POST" />
            <input type="hidden" name="remember" defaultValue="true" />
      
            {/* Name */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="name" className="capitalize md:text-lg text-xs">
                  Geofence Name:
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.name  ? inputsState.name : "" } 
                  id={`name`} name="name" type="text" placeholder="Enter Your Name" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.name}</span>)}
              </div>
            </div>
              
            {/* ID */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="geofence_ID" className="capitalize md:text-lg text-xs">
                  geofence ID: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.geofence_ID  ? inputsState.geofence_ID : "" }  
                  id={`geofence_ID`} name="geofence_ID" type="text" placeholder="Enter Geofence ID" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.geofence_ID}</span>)}
              </div>
            </div>

            {/* Type */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="geofence_location_type" className="capitalize md:text-lg text-xs">
                  Geofence Type: 
                </label>
                <DropdownSingleSearchList name="geofence_location_type" defaultArray={inputsState.geofence_location_type  ? inputsState.geofence_location_type==='active' ? [{name:'Active', id:'active'}] : [{name:'Passive', id:'passive'}] : []} array={[{name:'Active', id:'active'}, {name:'Passive', id:'passive'},]} setInput={setInput} />
                {errors && (<span className="text-red-common p-3">{errors.geofence_location_type}</span>)}
              </div>
            </div>
              
            {/* model data   */}
            {inputsState.geofence_location_type === "passive" ? (<>
              <div className="rounded-md -space-y-px flex  flex-wrap flex-col">
                <label className="capitalize md:text-lg text-xs">
                  Uploading Preprocessing Model files: 
                </label>

                {/* model file   */}  
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mt-4">
                    <label htmlFor="preprocessing_file" className="capitalize md:text-lg text-xs">
                      Preporcessing Geofence File:
                    </label>
                    <input onChange={(e)=>setInput(e)}  
                      id={`preprocessing_file`} name="preprocessing_file" type="file" placeholder="Upload the preporcessing geofence file" 
                      className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    />  
                    {errors && (<span className="text-red-common p-3">{errors.preprocessing_file}</span>)}
                  </div>
                </div>  
              </div>
            </>) : inputsState.geofence_location_type==="active" && (
              <>
                {/* <LocationSearchModal /> */}
                    
                {/* Geofence Geometric Shape */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mt-4">
                    <label htmlFor="geofence_type" className="capitalize md:text-lg text-xs">
                      Geofence Geometric Shape: 
                    </label>
                    <select id="geofence_type" name="geofence_type" onChange={(e)=>setInput(e)} value={inputsState.geofence_type  ? inputsState.geofence_type : "" } className={`w-full border bg-blue-thin rounded p-3 outline-none`}>
                      <option className="py-1 capitalize text-gray-common" value="" disabled>select your Choice...</option>
                      <option value="circular" className="py-1 text-blue-light capitalize">circular</option>
                      <option value="polygon" className="py-1 text-blue-light capitalize">polygon</option>
                    </select>
                    {errors && (<span className="text-red-common p-3">{errors.geofence_type}</span>)}
                  </div>
                </div>
                  
                  {inputsState.geofence_type === 'circular' ? (
                    <>
                      {/* Radius */}
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                          <label htmlFor="radius" className="capitalize md:text-lg text-xs">
                            radius:
                          </label>
                          <input onChange={(e)=>setInput(e)} value={inputsState.radius  ? inputsState.radius : "" } 
                            id={`radius`} name="radius" type="number" step="0.000001" placeholder="Enter The Radius in meter" 
                            className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                          />
                          {errors && (<span className="text-red-common p-3">{errors.radius}</span>)}
                        </div>
                      </div>

                      {/* Center Coord */}
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                          <label htmlFor="points_list_circular" className="capitalize md:text-lg text-xs">
                            Center Coordinates:
                          </label>
                          <div className="flex flex-row gap-x-2">
                            <div className="w-1/2">
                              <input onChange={(e)=>setInput(e)} value={inputsState.points_list_circular ? inputsState.points_list_circular[0] : "" } 
                                id={`points_list_circular`} name="points_list_circular_x" type="number" step="0.000001" placeholder="X-Coordinate" 
                                className=" bg-blue-thin p-2 border w-full md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                              />
                            </div>
                            <div className="w-1/2">
                              <input onChange={(e)=>setInput(e)} value={inputsState.points_list_circular ? inputsState.points_list_circular[1] : "" } 
                                id={`points_list_circular`} name="points_list_circular_y" type="number" step="0.000001" placeholder="Y-Coordinate" 
                                className=" bg-blue-thin p-2 border w-full  md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                              />  
                            </div>  
                          </div>
                        </div>
                      </div>
                    </>
                  ) : inputsState.geofence_type === 'polygon' && (
                    <>
                      <div className="flex flex-row flex-nowrap w-full justify-between">
                        <label htmlFor="points_list" className="capitalize  md:text-lg text-xs">
                          Points:
                        </label>
                        <div className="flex w-full flex-row flex-wrap gap-y-2 justify-end">
                          <button type="button" onClick={addPoint} className="p-2 my-0 block lg:w-1/2 w-full bg-blue-dark text-white rounded capitalize">Add Point</button>
                          <button type="button" onClick={removePoint} className="p-2 my-0 block lg:w-1/2 w-full bg-red-500 text-white rounded capitalize">Remove Point</button>
                        </div>
                      </div>
                      
                      {inputsState.points_list_polygon.map((el, index) => (
                        // points List
                        <div key={index} className="flex flex-row gap-x-2 mt-1">
                          <div className="w-1/2">
                            <input onChange={(e)=>setInput(e, index)} value={inputsState.points_list_polygon  && inputsState.points_list_polygon.length!==0 ? inputsState.points_list_polygon[index][0] : "" } 
                              id={`points_list_polygon`} name={`points_list_polygon_x`} type="number" step="0.000001" placeholder={`X${index+1}`} 
                              className=" bg-blue-thin p-2 border w-full md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                          </div>
                          <div className="w-1/2">
                            <input onChange={(e)=>setInput(e, index)} value={inputsState.points_list_polygon  && inputsState.points_list_polygon.length!==0 ? inputsState.points_list_polygon[index][1] : "" } 
                              id={`points_list_polygon`} name={`points_list_polygon_y`} type="number" step="0.000001" placeholder={`Y${index+1}`} 
                              className=" bg-blue-thin p-2 border w-full  md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />  
                          </div>
                        </div>
                      ))}
                    </>
                  )}
              </>
            )}
              
            <div>
              <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update Geofence
              </button>
            </div>
          </form>   
        </div>
      )}
    </section>

    </>
  );
}


export default withRouter(UpdateGeofencePage);
