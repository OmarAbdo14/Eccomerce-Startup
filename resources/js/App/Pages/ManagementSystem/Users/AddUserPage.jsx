import React, {useContext, useEffect, useState} from 'react'
import { UsersContext } from '../../../Context/UsersContext';
import Spinner from '../../../MainComponents/Spinner';
import { GeofencesContext } from '../../../Context/GeofencesContext';
import DropdownMultipleSearchList from './../../../MainComponents/DropdownMultipleSearchList';
import DropdownSingleSearchList from './../../../MainComponents/DropdownSingleSearchList';
import { GeneralContext } from '../../../Context/GeneralContext';

const AddUserPage = () => {
  const { loading, addUser, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(UsersContext);
  const { getContent, content } = useContext(GeneralContext);
  const { geofences, getAllGeofences } = useContext(GeofencesContext);
  const weekDays = [
    {name:'Sat', id:'saturday'},
    {name:'Sun', id:'sunday'},
    {name:'Mon', id:'monday'},
    {name:'Tue', id:'tuesday'},
    {name:'Wed', id:'wednesday'},
    {name:'Thu', id:'thursday'},
    {name:'Fri', id:'friday'},
  ];

  useEffect(async() => {
    await resetAllInputs();
    await resetAllErrors();
    await getAllGeofences();
    await getContent();
  }, []);

  async function addHandler(e) {
    e.preventDefault();
    await addUser(inputsState);    
  };

  
  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
      {!loading && content && inputsState ? (
      <section className="w-11/12 mx-auto my-5">
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Add User</h1>
          <form onSubmit={(e)=>addHandler(e)} className="my-8 space-y-6 w-6/12" encType="multipart/form-data">
            <input type="hidden" name="_method" value="POST" />
            <input type="hidden" name="remember" defaultValue="true" />

            {/* full name   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="name" className="capitalize md:text-lg text-xs">
                  full name:
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.name  ? inputsState.name: "" } id={`name`} name="name" type="text" placeholder="Enter The Full Name" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.name}</span>)}
              </div>
            </div>

            {/* username   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="username" className="capitalize md:text-lg text-xs">
                  username: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.username  ? inputsState.username: "" }  id={`username`} name="username" type="text" placeholder="Enter username" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.username}</span>)}
              </div>
            </div>

            {/* email   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="email" className="capitalize md:text-lg text-xs">
                  Email Address: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.email  ? inputsState.email: "" }  id={`email`} name="email" type="email" placeholder="Enter Email Address"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.email}</span>)}
              </div>
            </div>             

            {/* responsibility  
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="responsible" className="capitalize md:text-lg text-xs">
                  Is responsible: 
                </label>
                
                <DropdownSingleSearchList defaultArray={ inputsState.responsible ? [{id:inputsState.responsible, name: inputsState.responsible ? 'Yes' : 'No'}] : []} name='responsible' array={[
                  {id: 1, name: 'Yes'},
                  {id: 0, name: 'No'},
                ]} setInput={setInput} />
                
                {errors && (<span className="text-red-common p-3">{errors.responsible}</span>)}
              </div>
            </div> */}

            {/* ID type   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="ID_type" className="capitalize md:text-lg text-xs">
                  ID Type: 
                </label>
                
                <DropdownSingleSearchList defaultArray={inputsState.ID_type ? [{id:inputsState.ID_type, name: inputsState.ID_type==='national_id' ? 'national ID' : 'Passport No.'}] : []} name='ID_type' array={[
                  {id: 'national_id', name: 'national ID'},
                  {id: 'passport_no', name: 'Passport No.'},
                ]} setInput={setInput} />
                
                {errors && (<span className="text-red-common p-3">{errors.ID_type}</span>)}
              </div>
            </div>

            {/* formal ID */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="formal_ID" className="capitalize md:text-lg text-xs">
                  formal ID: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.formal_ID  ? inputsState.formal_ID: "" }  id={`formal_ID`} name="formal_ID" type="number" placeholder="Enter Your Email Address"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.formal_ID}</span>)}

              </div>
            </div>

            {/* phone */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="phone" className="capitalize md:text-lg text-xs">
                  Phone Number: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.phone  ? inputsState.phone: "" }  id={`phone`} name="phone" type="phone" placeholder="Enter Your Email Address"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.phone}</span>)}
              </div>
            </div>

            {/* Geofences list   */}
            <div className="rounded-md -space-y-px flex  flex-wrap flex-col">
              <label htmlFor="geofences" className="capitalize md:text-lg text-xs">
              Associate Geofences: 
              </label>
            
              <DropdownMultipleSearchList defaultArray={inputsState.geofences && inputsState.geofences.length>=1 ? inputsState.geofences.map((geofence_id, index)=>geofences.find((geofence)=> geofence.id===Number(geofence_id))) : []} name='geofences' array={geofences} setInput={setInput} />
              {errors && (<span className="text-red-common p-3">{errors.geofences}</span>)}
            </div>

            {/* Schedual/OneTime/Periodic/Duration */}
            {inputsState.geofences && inputsState.geofences.map((geofence_id, index)=>(
              <div key={index} className="flex flex-col">
                <div className="rounded-md -space-y-px flex  flex-wrap flex-col">
                  <label className="capitalize md:text-lg text-xs">
                    {geofences.find((geofence)=> geofence.id===Number(geofence_id)).name}: 
                  </label>

                  {/* temporary or permanent   */}
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="mt-4">
                      <label htmlFor={`isPermanent_${geofence_id}`} className="capitalize md:text-lg text-xs">
                        Permanent OR Temporary Association:
                      </label>
                      <DropdownSingleSearchList name={`isPermanent_${geofence_id}`} defaultArray={[{ name: 'Permanent', id: true, },]} array={[
                        { name: 'Temporary', id: false, },
                        { name: 'Permanent', id: true, },
                      ]} setInput={setInput} />
                      {errors && (<span className="text-red-common p-3">{errors.isPermanent}</span>)}
                    </div>
                  </div>
                </div>

                {inputsState.hasOwnProperty(`isPermanent_${geofence_id}`) && inputsState[`isPermanent_${geofence_id}`]==0 && (<>
                  {/* Is Repeated   */}
                  {/* <div className="flex flex-row flex-wrap items-between"> */}
                    {/* One Time */}
                    {/* <div className="mt-4 lg:w-1/3 w-full flex flex-row flex-nowrap items-baseline">
                      <input onChange={(e) => { setInput(e);} }
                        name={`isRepeated_${geofence_id}`} id={`one_time_${geofence_id}`} type="radio" defaultChecked  value={false} 
                        className=" bg-blue-thin mr-2 p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      /><label htmlFor={`one_time_${geofence_id}`}>One Time</label>
                    </div> */}

                    {/* Repeated */}
                    {/* <div className="mt-4 lg:w-1/3 w-full flex flex-row flex-nowrap items-baseline">
                      <input onChange={(e) => { setInput(e);} }
                        name={`isRepeated_${geofence_id}`} id={`isRepeated_${geofence_id}`} type="radio" value={true}
                        className=" bg-blue-thin mr-2 p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      /><label htmlFor={`isRepeated_${geofence_id}`}>Repeated</label>
                    </div>
                  </div> */}

                  {/* Days list   */}
                  <div className="rounded-md -space-y-px flex flex-wrap flex-col">
                    <label htmlFor={`schedule_${geofence_id}`} className="capitalize md:text-lg text-xs">
                    Days: 
                    </label>
                    <DropdownMultipleSearchList name={`schedule_${geofence_id}`} defaultArray={inputsState[`schedule_${geofence_id}`] ? inputsState[`schedule_${geofence_id}`] : []} array={weekDays} setInput={setInput} />
                    {errors && (<span className="text-red-common p-3">{errors.schedule}</span>)}
                  </div>

                  {/* Start Date Time */}
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="mt-4">
                      <label htmlFor={`start_time_${geofence_id}`} className="capitalize md:text-lg text-xs">
                        From: 
                      </label>
                      <input onChange={(e)=>setInput(e)} value={inputsState[`start_time_${geofence_id}`]  ? inputsState[`start_time_${geofence_id}`]: "" }  id={`start_time_${geofence_id}`} name={`start_time_${geofence_id}`} type="datetime-local" placeholder="Ex: 02:24:30"
                        className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      />
                      {errors && (<span className="text-red-common p-3">{errors.start_time}</span>)}
                    </div>
                  </div>

                  {/* End Date Time */}
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="mt-4">
                      <label htmlFor={`end_time_${geofence_id}`} className="capitalize md:text-lg text-xs">
                        To: 
                      </label>
                      <input onChange={(e)=>setInput(e)} value={inputsState[`end_time_${geofence_id}`]  ? inputsState[`end_time_${geofence_id}`]: "" }  id={`end_time_${geofence_id}`} name={`end_time_${geofence_id}`} type="datetime-local" placeholder="Ex: 02:24:30"
                        className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      />
                      {errors && (<span className="text-red-common p-3">{errors.end_time}</span>)}
                    </div>
                  </div> 
                </>)}
              </div>
            ))}
            
            {/* Submit */}
            <div>
              <button type="submit"
                className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group:hover:text-indigo-700" aria-hidden="true" />
                </span> */}
                Add User
              </button>
            </div>
          </form>
        </div>
      </section>
    ): null}
    </>
  );
}


export default AddUserPage
