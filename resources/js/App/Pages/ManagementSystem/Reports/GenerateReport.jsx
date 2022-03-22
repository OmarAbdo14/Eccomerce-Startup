import React, { useContext, useEffect } from 'react'
import { GeneralContext } from '../../../Context/GeneralContext';
import Spinner from '../../../MainComponents/Spinner';
import DropdownSingleSearchList from '../../../MainComponents/DropdownSingleSearchList';
import { ReportsContext } from '../../../Context/ReportsContext';



const GenerateReport = ({ langs, }) => {
  const {content, getContent,} = useContext(GeneralContext);
  const { loading, errors, setInput, inputsState, resetAllInputs, resetAllErrors, generateReport,} = useContext(ReportsContext);
  
  useEffect(async() => {
    await getContent();
    await resetAllInputs();
    await resetAllErrors();
  
  }, []);

  async function addHandler(e) {
    e.preventDefault();
    await resetAllErrors();
    await generateReport(inputsState);    
  };

  return (<>
    {loading && (
      <div className="flex flex-col justify-center items-center h-screen">
        <Spinner />
      </div>
    )}
    {!loading && content && inputsState && (<>
      <div className="w-11/12 mx-auto my-5">
        <h1 className="text-lg font-bold text-blue-dark mb-5">Reports</h1>
        <div className="align-middle bg-white p-5 rounded-lg text-left shadow-xl">
          <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
            <form onSubmit={(e)=>addHandler(e)} className="my-8 space-y-6 w-full" encType="multipart/form-data">
              <input type="hidden" name="_method" value="POST" />
              <input type="hidden" name="remember" defaultValue="true" />

              <div className='flex flex-col w-full items-center flex-wrap'>
                {/* Report For */}
                <div className="rounded-md flex  flex-wrap flex-col w-3/5">
                  <label htmlFor="report_type" className="capitalize md:text-lg text-xs">
                    Report For: 
                  </label>
                  <DropdownSingleSearchList defaultArray={[]} array={[{id:'user', name:'User'}, {id:'geofence', name:'Geofence'}]} name='report_type' setInput={setInput} />
                  
                  {errors && (<span className="text-red-common p-3">{errors.report_type}</span>)}
                </div>  
                
                {inputsState && inputsState.report_type==='geofence' ? (<>
                  {/* Geofence Types */}
                  <div className="rounded-md flex  flex-wrap flex-col w-3/5">
                    <label htmlFor="geofence_types" className="capitalize md:text-lg text-xs">
                      Geofence Types: 
                    </label>
                    <DropdownSingleSearchList defaultArray={[]} array={[
                      {id:'unassociated', name:'Unassociated'}, 
                      {id:'prohebited', name:'Prohebited'},
                      {id:'over capacity', name:'Over Capacity'},
                      {id:'all', name:'All'},
                      ]} name='geofence_types' setInput={setInput} />
                    {errors && (<span className="text-red-common p-3">{errors.geofence_types}</span>)}
                  </div>
                </>) : inputsState.report_type==='user' && (<>
                  {/* User Types */}
                  <div className="rounded-md flex  flex-wrap flex-col w-3/5">
                    <label htmlFor="user_types" className="capitalize md:text-lg text-xs">
                      User Types: 
                    </label>
                    <DropdownSingleSearchList defaultArray={[]} array={[
                      {id:'unassociated', name:'Unassociated'}, 
                      {id:'all', name:'All'},
                    ]} name='user_types' setInput={setInput} />
                    {errors && (<span className="text-red-common p-3">{errors.user_types}</span>)}
                  </div>
                </>)}

                {/* Start Date Time */}
                <div className="rounded-md shadow-sm -space-y-px w-3/5">
                  <div className="mt-4">
                    <label htmlFor={`start_time`} className="capitalize md:text-lg text-xs">
                      From: 
                    </label>
                    <input onChange={(e)=>setInput(e)} value={inputsState[`start_time`]  ? inputsState[`start_time`]: "" }  id={`start_time`} name={`start_time`} type="datetime-local" placeholder="Ex: 02:24:30"
                      className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    />
                    {errors && (<span className="text-red-common p-3">{errors.start_time}</span>)}
                  </div>
                </div>

                {/* End Date Time */}
                <div className="rounded-md shadow-sm -space-y-px w-3/5">
                  <div className="mt-4">
                    <label htmlFor={`end_time`} className="capitalize md:text-lg text-xs">
                      To: 
                    </label>
                    <input onChange={(e)=>setInput(e)} value={inputsState[`end_time`]  ? inputsState[`end_time`]: "" }  id={`end_time`} name={`end_time`} type="datetime-local" placeholder="Ex: 02:24:30"
                      className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    />
                    {errors && (<span className="text-red-common p-3">{errors.end_time}</span>)}
                  </div>
                </div>
                
              </div>
              
              {/* Submit */}
              <div className='w-3/5 mx-auto'>
                <button type="submit"
                  className="group bg-blue-dark relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-white font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group:hover:text-indigo-700" aria-hidden="true" />
                  </span> */}
                  Generate Report
                </button>
              </div>

            </form>
          </div>
        </div>    
      </div>
    </>)}  
  </>)
}

export default GenerateReport

