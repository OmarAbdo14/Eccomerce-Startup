import React, {useContext, useEffect} from 'react'

import { IoT_devicesContext } from '../../../Context/IoT_devicesContext';
import Spinner from '../../../MainComponents/Spinner';
import DropdownSingleSearchList from '../../../MainComponents/DropdownSingleSearchList';
import { GeneralContext } from '../../../Context/GeneralContext';


const AddIoTDevicePage = () => {
  const { loading, addIoT_device, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(IoT_devicesContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getContent();
  }, []);

  async function addHandler(e) {
    e.preventDefault();
    await addIoT_device(inputsState);    
  };

  return (<>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {!loading && content && inputsState ? (<>
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Add IoT Device</h1>
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

            {/* IoT ID */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="IoT_ID" className="capitalize md:text-lg text-xs">
                  IoT_ID: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.IoT_ID  ? inputsState.IoT_ID : "" }  
                  id={`IoT_ID`} name="IoT_ID" type="text" placeholder="Enter Your zone ID" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.IoT_ID}</span>)}
              </div>
            </div>
              
            {/* IoT Type  
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="type" className="capitalize md:text-lg text-xs">
                  Select IoT Type : 
                </label>
                <DropdownSingleSearchList name="type" defaultArray={ inputsState.type ? [{id: inputsState.type, name: inputsState.type==='counting+alarming' ? 'counting + alarming' : 'counting'}] : []} array={[{name:'counting', id:'counting'}, {name:'counting + alarming', id:'counting+alarming'},]} setInput={setInput} />
                {errors && (<span className="text-red-common p-3">{errors.type}</span>)}
              </div>
            </div> */}

            {/* submit */}
            <div>
              <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add IoT Device
              </button>
            </div>
          </form> 
        </div>
      </>) : null}
    </section>
  </>);
}


export default AddIoTDevicePage
