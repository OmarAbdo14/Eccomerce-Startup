import React, { useContext, useEffect } from 'react'
import { UserCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import Sidebar from '../../MainComponents/Sidebar';
import { GeneralContext } from '../../Context/GeneralContext';
import DropdownSingleSearchList from '../../MainComponents/DropdownSingleSearchList';
import Spinner from '../../MainComponents/Spinner';


const Settings = ({ langs, }) => {
  const { loading, saveSettings, getSettings, errors, setSettings, content, getContent, inputsState, resetAllErrors,} = useContext(GeneralContext);
  
  useEffect(async() => {
    await getSettings();
    await getContent();
  
  }, []);

  async function updateHandler(e) {
    e.preventDefault();
    await resetAllErrors();
    await saveSettings(inputsState);    
  };

  return (<>
    <Sidebar />
    <main className="bg-gray-light col px-0">
    {loading && (
      <div className="flex flex-col justify-center items-center h-screen">
        <Spinner />
      </div>
    )}
    {!loading && content && inputsState && (<>
      <div className="w-11/12 mx-auto my-5">
        <h1 className="text-lg font-bold text-blue-dark mb-5">Settings</h1>
        <div className="align-middle bg-white p-5 rounded-lg text-left shadow-xl">
          <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
            <form onSubmit={(e)=>updateHandler(e)} className="my-8 space-y-6 w-full" encType="multipart/form-data">
              <input type="hidden" name="_method" value="POST" />
              <input type="hidden" name="remember" defaultValue="true" />

              <div className='flex flex-row w-full justify-between flex-wrap overflow-hidden'>
                {/* current language */}
                <div className="rounded-md flex  flex-wrap flex-col w-2/5">
                  <label htmlFor="current_lang" className="capitalize md:text-lg text-xs">
                    Current Language: 
                  </label>
                  <DropdownSingleSearchList defaultArray={[]} array={[{id:'en', name:'English'}, {id:'ar', name:'العربية'},]} name='current_lang' setInput={setSettings} />
                  
                  {errors && (<span className="text-red-common p-3">{errors.current_lang}</span>)}
                </div>  

                {/* Work Start Time */}
                <div className="rounded-md flex  flex-wrap flex-col w-2/5">
                  <label htmlFor="work_start_time" className="capitalize md:text-lg text-xs">
                    Work Start Time: 
                  </label>
                  <input onChange={(e)=>setSettings(e)} value={inputsState.work_start_time  ? inputsState.work_start_time: "" }  id={`work_start_time`} name="work_start_time" type='time' placeholder="Ex: choose The time"
                    className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                  />                  
                  {errors && (<span className="text-red-common p-3">{errors.work_start_time}</span>)}
                </div>

                {/* max allowed time for IoT reading */}
                <div className="rounded-md flex  flex-wrap flex-col w-2/5">
                  <label htmlFor="max_allowed_time_for_IoT_reading" className="capitalize md:text-lg text-xs">
                    max allowed time for IoT reading: 
                  </label>
                  <input onChange={(e)=>setSettings(e)} value={inputsState.max_allowed_time_for_IoT_reading  ? inputsState.max_allowed_time_for_IoT_reading: "" }  id={`max_allowed_time_for_IoT_reading`} name="max_allowed_time_for_IoT_reading" type='number' placeholder="Enter number in minutes"
                    className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                  />                  
                  {errors && (<span className="text-red-common p-3">{errors.max_allowed_time_for_IoT_reading}</span>)}
                </div>

                {/* Organization Name */}
                <div className="rounded-md flex  flex-wrap flex-col w-2/5">
                  <label htmlFor="organization_name" className="capitalize md:text-lg text-xs">
                    Organization Name: 
                  </label>
                  <input onChange={(e)=>setSettings(e)} value={inputsState.organization_name  ? inputsState.organization_name: "" }  id={`organization_name`} name="organization_name" type='time' placeholder="Ex: choose The time"
                    className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                  />                  
                  {errors && (<span className="text-red-common p-3">{errors.organization_name}</span>)}
                </div>

                {/* Radius */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mt-4">
                    <label htmlFor="organization_radius" className="capitalize md:text-lg text-xs">
                      Organization Radius:
                    </label>
                    <input onChange={(e)=>setInput(e)} value={inputsState.organization_radius  ? inputsState.organization_radius : "" } 
                      id={`organization_radius`} name="organization_radius" type="number" step="0.000001" placeholder="Enter The Radius in meter" 
                      className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    />
                    {errors && (<span className="text-red-common p-3">{errors.organization_radius}</span>)}
                  </div>
                </div>

                {/* Center Coord */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mt-4">
                    <label htmlFor="organization_coordinates" className="capitalize md:text-lg text-xs">
                      OrganizationCenter Coordinates:
                    </label>
                    <div className="flex flex-row gap-x-2">
                      <div className="w-1/2">
                        <input onChange={(e)=>setInput(e)} value={inputsState.organization_coordinates ? inputsState.organization_coordinates[0] : "" } 
                          id={`organization_coordinates`} name="organization_coordinates_x" type="number" step="0.000001" placeholder="X-Coordinate" 
                          className=" bg-blue-thin p-2 border w-full md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                        />
                          </div>

                      <div className="w-1/2">
                        <input onChange={(e)=>setInput(e)} value={inputsState.organization_coordinates ? inputsState.organization_coordinates[1] : "" } 
                          id={`organization_coordinates`} name="organization_coordinates_y" type="number" step="0.000001" placeholder="Y-Coordinate" 
                          className=" bg-blue-thin p-2 border w-full  md:text-base text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                        />  
                      </div>  
                    </div>
                  </div>
                </div>

              </div>

              <div className='w-1/3'>
                <button type="submit"
                  className="group bg-blue-dark relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-white font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group:hover:text-indigo-700" aria-hidden="true" />
                  </span> */}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>    
      </div>
    </>)}  
    </main>
  </>)
}

export default Settings

