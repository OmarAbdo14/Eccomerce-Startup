import React, {useContext, useEffect, useRef, useState} from 'react'
import { GeneralContext } from '../../../Context/GeneralContext';

import { GeofencesContext } from '../../../Context/GeofencesContext';
import Spinner from '../../../MainComponents/Spinner';
import DropdownSingleSearchList from './../../../MainComponents/DropdownSingleSearchList';


const AddGeofencePage = () => {
  const { loading, addPoint, removePoint, addPassiveGeofence, addCircularGeofence, addPolygonGeofence, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(GeofencesContext);
  const [uploadingState, setUploadingState] = useState('auto')
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getContent();

  }, []);

  async function addHandler(e) {
    e.preventDefault();
    if (inputsState.geofence_location_type==="active") {
      if (inputsState.geofence_type === 'circular') {
        await addCircularGeofence(inputsState);
      } else if (inputsState.geofence_type === 'polygon') {
        await addPolygonGeofence(inputsState);
      }
    } else {
      let formData = new FormData();
      formData.append("name", inputsState.name);
      formData.append("geofence_ID", inputsState.geofence_ID);
      formData.append("geofence_location_type", false);
      formData.append("preprocessing_file", inputsState.preprocessing_file);
      await addPassiveGeofence(formData);
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
      
      {!loading && content && inputsState && (<>
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Add Geofence</h1>
          <form onSubmit={(e)=>addHandler(e)} className="my-8 space-y-6 w-8/12" method="POST" encType="multipart/form-data">            
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
                  Uploading geofence model data files: 
                </label>
                
                <div className="flex flex-row flex-wrap items-between">
                  {/* automatic */}
                  <div className="mt-4 lg:w-1/3 w-full flex flex-row flex-nowrap items-baseline">
                      <input onChange={(e) => { setUploadingState('auto'); setInput({ target: { name: 'model_auto'} });} } defaultChecked="true"
                      name="uploading" id="auto" type="radio" value='auto' 
                      className=" bg-blue-thin mr-2 p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    /><label htmlFor="auto">automatic</label>
                  </div>

                  {/* manually */}
                  <div className="mt-4 lg:w-1/3 w-full flex flex-row flex-nowrap items-baseline">
                    <input onChange={(e) => { setUploadingState('manual'); setInput({ target: { name: 'model_manual' } });} }
                      name="uploading" id="manual" type="radio"  value='manual' 
                      className=" bg-blue-thin mr-2 p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    /><label htmlFor="manual">manually</label>
                  </div>
                </div>
              </div>

              {uploadingState === 'manual' && (<>
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
              </>)}

            </>) : inputsState.geofence_location_type==="active" && (<>
              {/* <LocationSearchModal /> */}
                  
              {/* Geofence Geometric Shape */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="geofence_type" className="capitalize md:text-lg text-xs">
                    Geofence Geometric Shape: 
                  </label>
                  <DropdownSingleSearchList name="geofence_type" defaultArray={[]} array={[{name:'circular', id:'circular'}, {name:'polygon', id:'polygon'},]} setInput={setInput} />                       
                  {errors && (<span className="text-red-common p-3">{errors.geofence_type}</span>)}
                </div>
              </div>
                
              {inputsState.geofence_type === 'circular' ? (<>
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
                </div></>) : inputsState.geofence_type === 'polygon' && (<>
                <div className="flex flex-row items-between w-full">
                  <label htmlFor="points_list" className="w-1/4 capitalize md:text-lg text-xs">
                      Points:
                  </label>
                  <div className="w-3/4 flex flex-row items-center">
                    <button type="button" onClick={addPoint} className="w-1/2 p-2 bg-blue-dark mx-1 text-white rounded capitalize">Add Point</button>
                    <button type="button" onClick={removePoint} className="w-1/2 p-2 bg-red-500 text-white rounded capitalize">Remove Point</button>
                  </div>      
                </div>
                    
                {inputsState.points_list_polygon.map((el, index) => (
                  // points List
                  <div key={index} className="flex flex-row gap-x-2 mt-1">
                    <div className="w-1/2">
                      <input onChange={(e)=>setInput(e, index)} value={inputsState.points_list_polygon  && inputsState.points_list_polygon.length!==0 ? inputsState.points_list_polygon[index][0] : "" } 
                        id={`points_list`} name={`points_list_polygon_x`} type="number" step="0.000001" placeholder={`X${index+1}`} 
                        className=" bg-blue-thin p-2 border w-full md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      />
                    </div>
                    <div className="w-1/2">
                      <input onChange={(e)=>setInput(e, index)} value={inputsState.points_list_polygon  && inputsState.points_list_polygon.length!==0 ? inputsState.points_list_polygon[index][1] : "" } 
                        id={`points_list`} name={`points_list_polygon_y`} type="number" step="0.000001" placeholder={`Y${index+1}`} 
                        className=" bg-blue-thin p-2 border w-full  md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      />  
                    </div>
                  </div>
                ))}
              </>)}
            </>)}

            {/* submit    */}
            <div>
              <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Geofence
              </button>
            </div>
          </form> 
        </div>
      </>)}
    </section>
    </>
  );
}


export default AddGeofencePage
