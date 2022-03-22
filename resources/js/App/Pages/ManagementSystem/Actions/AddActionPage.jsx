import { ArrowRightIcon } from '@heroicons/react/solid';
import React, {useContext, useEffect, useRef} from 'react'

import { ActionsContext } from '../../../Context/ActionsContext';
import Spinner from '../../../MainComponents/Spinner';
import { Link } from 'react-router-dom';
// import LocationSearchModal from '../../../MainComponents/LocationSearchModal';
import DropdownSingleSearchList from '../../../MainComponents/DropdownSingleSearchList';
import { GeneralContext } from '../../../Context/GeneralContext';


const AddActionPage = () => {
  const { loading, getGeofenceTypes, geofenceTypes, addAction, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(ActionsContext);
  const { getContent, content } = useContext(GeneralContext);
  
  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getGeofenceTypes();
    await getContent();
  }, []);

  async function addHandler(e) {
    e.preventDefault();
    await addAction(inputsState);
  };

  function compareActionsWithAction_id(actions) {
    actions.forEach(action => {
      if (action.name === inputsState.type)
        return false;
    });
  }


  return (<>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {!loading && geofenceTypes.length<1 && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`There is not any geofence types`}</h1>
        </div>
      )}

      {(!loading && content && inputsState && geofenceTypes.length>=1) ? (<>
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Add Action</h1>
          <form onSubmit={(e)=>addHandler(e)} className="my-8 space-y-6 w-8/12" encType="multipart/form-data">            
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
                <DropdownSingleSearchList name="type" defaultArray={[]} array={[
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
                <DropdownSingleSearchList name="geofence_type" defaultArray={[]} array={inputsState.type && geofenceTypes.filter((type, index)=>compareActionsWithAction_id(type.actions)).length>=1 ? geofenceTypes.filter((type, index)=>compareActionsWithAction_id(type.actions)) : geofenceTypes} setInput={setInput} />
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

            {/* Submit  */}
            <div>
              <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Action
              </button>
            </div>
          </form> 
        </div>
      </>) : null}
    </section>
  </>);
}


export default AddActionPage
