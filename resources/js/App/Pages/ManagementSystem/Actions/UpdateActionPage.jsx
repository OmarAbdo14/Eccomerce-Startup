import React, {useContext, useEffect} from 'react'
import { withRouter } from 'react-router-dom';

import { ActionsContext } from '../../../Context/ActionsContext';
import { GeneralContext } from '../../../Context/GeneralContext';
import DropdownSingleSearchList from '../../../MainComponents/DropdownSingleSearchList';
import Spinner from '../../../MainComponents/Spinner';



const UpdateActionPage = ({match}) => {
  const { loading, getGeofenceTypes, geofenceTypes, getActionById, updateAction, message, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(ActionsContext);
  const { getContent, content } = useContext(GeneralContext);
  
  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getGeofenceTypes();
    await getActionById(match.params.id)
    await getContent();
  }, []);

  async function updateHandler(e) {
    e.preventDefault();
    await updateAction(match.params.id, inputsState);
    
  };
  
  return (
    <>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {!loading && message === 'This action is not exist' ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`This action is not exist`}</h1>
        </div>
      ) : !loading && geofenceTypes.length<1 && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`There is not any geofence types`}</h1>
        </div>
      )}

      {(!loading && content && inputsState && geofenceTypes.length>=1) && (<>
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Update Action</h1>
          <form onSubmit={(e)=>updateHandler(e)} className="my-8 space-y-6 w-6/12" encType="multipart/form-data">            
            <input type="hidden" name="_method" value="POST" />
            <input type="hidden" name="remember" defaultValue="true" />
      
            {/* name   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="name" className="capitalize md:text-lg text-xs">
                  Name:
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.name  ? inputsState.name : "" } 
                  id={`name`} name="name" type="text" placeholder="Enter Your Name" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.name}</span>)}
              </div>
            </div>

            {/* action type   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="type" className="capitalize md:text-lg text-xs">
                  Action Type:
                </label>
                <DropdownSingleSearchList name="type" defaultArray={inputsState.type  ? [inputsState.type==='notify-user' ? { name: 'notify user', id: 'notify-user' } : { name: 'notify responsible', id: 'notify-responsible' }] : []} array={[
                  { name: 'notify user', id: 'notify-user' },
                  // { name: 'alert responsible', id: 'alert-responsible' },
                  // { name: 'alarm place', id: 'alarm-place' },
                  { name: 'notify responsible', id: 'notify-responsible' },
                ]} setInput={setInput} />
                {errors && (<span className="text-red-common p-3">{errors.type}</span>)}
              </div>
            </div>
              
            {/* geofence type   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="geofence_type" className="capitalize md:text-lg text-xs">
                  Geofence Type:
                </label>
                <DropdownSingleSearchList name="geofence_type" defaultArray={geofenceTypes && geofenceTypes.length>=1 ? inputsState.geofence_type ? inputsState.geofence_type.hasOwnProperty('id') ? [geofenceTypes.find((type)=>type.id===Number(inputsState.geofence_type.id))] : [geofenceTypes.find((type)=>type.id===Number(inputsState.geofence_type))] : [] : []} array={geofenceTypes} setInput={setInput} />
                {errors && (<span className="text-red-common p-3">{errors.geofence_type}</span>)}
              </div>
            </div>
              
            {/* message   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="message" className="capitalize md:text-lg text-xs">
                Message: 
                </label>
                <textarea onChange={(e)=>setInput(e)} value={inputsState.message  ? inputsState.message : "" }  
                  id={`message`} name="message" placeholder="Enter Action ID" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                >
                  
                </textarea>
                {errors && (<span className="text-red-common p-3">{errors.message}</span>)}
              </div>
            </div>
              
            {/* Submit   */}
            <div>
              <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update Action
              </button>
            </div>
          </form>   
        </div>
      </>)}
    </section>

    </>
  );
}


export default withRouter(UpdateActionPage);
