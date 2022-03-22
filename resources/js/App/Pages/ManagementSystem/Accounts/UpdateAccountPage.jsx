import React, {useContext, useEffect} from 'react'

import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Spinner from './../../../MainComponents/Spinner';
import { AccountsContext } from '../../../Context/AccountsContext';
import { AdminContext } from '../../../Context/AdminContext';
import DropdownMultipleSearchList from '../../../MainComponents/DropdownMultipleSearchList';
import { GeneralContext } from '../../../Context/GeneralContext';


const UpdateAccountPage = ({match}) => {
  const { loading, getAccountById, updateAccount, errors, message, setInput, inputsState, account, resetAllInputs, resetAllErrors } = useContext(AccountsContext);
  const { admin } = useContext(AdminContext);
  const { getContent, content } = useContext(GeneralContext);


  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getAccountById(match.params.id);
    await getContent();

  }, []);

  async function updateHandler(e) {
    e.preventDefault();
    e.preventDefault();
    let formData = new FormData();
    formData.append("full_name", inputsState.full_name);
    formData.append("username", inputsState.username);
    formData.append("email", inputsState.email);
    formData.append("permissions", inputsState.permissions);
    formData.append("image", inputsState.image);
    // formData.append("password", inputsState.password);
    console.log('sdefe', formData);
    await updateAccount(match.params.id, formData);        
  };


  return (
    <>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {!loading && message === 'This account is not exist' && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`This account is not exist`}</h1>
        </div>
      )}
      
      {!loading && content && message==='Account has been returned successfully' && inputsState && !isEmpty(admin) && (
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
        <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Update Account</h1>
        <form onSubmit={(e)=>updateHandler(e)} type="post" className="my-8 space-y-6 w-6/12" encType="multipart/form-data">
          <input type="hidden" name="_method" value="POST" />
          <input type="hidden" name="remember" defaultValue="true" />
          
          {/* full name   */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-4">
              <label htmlFor="full_name" className="capitalize md:text-lg text-xs">
                full name<span className="text-red-common">*</span> :
              </label>
              <input onChange={(e)=>setInput(e)} value={inputsState.full_name  ? inputsState.full_name : "" } id={`full_name`} name="full_name" type="text" placeholder="Enter The Full Name" 
                className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              />
              {errors && (<span className="text-red-common p-3">{errors.full_name}</span>)}
            </div>
          </div>

          {/* username   */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-4">
              <label htmlFor="username" className="capitalize md:text-lg text-xs">
                username<span className="text-red-common">*</span> : 
              </label>
              <input onChange={(e)=>setInput(e)} value={inputsState.username  ? inputsState.username : "" }  id={`username`} name="username" type="text" placeholder="Enter Your username" 
                className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              />
              {errors && (<span className="text-red-common p-3">{errors.username}</span>)}
            </div>
          </div>

          {/* Email   */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-4">
              <label htmlFor="email" className="capitalize md:text-lg text-xs">
                Email Address<span className="text-red-common">*</span> : 
              </label>
              <input onChange={(e)=>setInput(e)} value={inputsState.email  ? inputsState.email : "" }  id={`email`} name="email" type="email" placeholder="Enter Your Email Address"
                className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              />
              {errors && (<span className="text-red-common p-3">{errors.email}</span>)}

            </div>
          </div>
              
          {/* Password   */}
          {/* <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-4">
              <label htmlFor="password" className="capitalize md:text-lg text-xs">
                Password<span className="text-red-common">*</span> : 
              </label>
              <input onChange={(e)=>setInput(e)} value={inputsState.password  ? inputsState.password : "" }  id={`password`} name="password" type="password" placeholder="Enter password"
                className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              />
              {errors && (<span className="text-red-common p-3">{errors.password}</span>)}

            </div>
          </div> */}

          {/* Permissions */}
          <div className="rounded-md -space-y-px flex  flex-wrap flex-col">
            <label htmlFor="permissions" className="capitalize md:text-lg text-xs">
              Permissions<span className="text-red-common">*</span> : 
            </label>
            <DropdownMultipleSearchList defaultArray={inputsState.permissions} array={admin.permissions} name='permissions' setInput={setInput} />
            {errors && (<span className="text-red-common p-3">{errors.permissions}</span>)}
          </div>

          {/* image   */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-4">
              <label htmlFor="image" className="capitalize md:text-lg text-xs">
                Upload Your Image : 
              </label>
              <input id={`image`} onChange={(e)=>setInput(e)} 
                name="image" type="file" placeholder="Upload Image"
                className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              />
              {errors && (<span className="text-red-common p-3">{errors.image}</span>)}
            </div>
          </div>

          <div>
            <button type="submit"
              className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group:hover:text-indigo-700" aria-hidden="true" />
              </span> */}
              Update Account
            </button>
          </div>
        </form>
        </div>
      )}
    </section>
    </>
  );
}


export default withRouter(UpdateAccountPage);
