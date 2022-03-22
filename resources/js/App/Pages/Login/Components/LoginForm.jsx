import React, {useEffect, useContext} from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { AdminContext } from '../../../Context/AdminContext';
import Spinner from './../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const LoginForm = () => {
  const { message, getContent, content } = useContext(GeneralContext);
  const { loading, errors, setInput, inputsState, resetAllInputs, resetAllErrors, login } = useContext(AdminContext);

  useEffect(async() => {
    await resetAllInputs();
    await resetAllErrors();
    await getContent();
  }, []);


  async function loginHandler(e) {
    e.preventDefault();
    await login(inputsState);    
  };


  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen w-full">
          <Spinner />
        </div>
      )}
      
      {!loading && content ? (
        <main className="md:w-1/2 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">{content.login_form_title}</h2>
            </div>
            <form onSubmit={(e)=>loginHandler(e)} className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <input type="hidden" name="_method" value="POST" />

              {/* identifier */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="identifier" className="capitalize md:text-lg text-xs">
                    {content.login_form_identifier} :
                  </label>
                  <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.identifier : ''} id={`identifier`} name="identifier" type="text" placeholder="Enter Your Email Address" 
                    className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                  />
                  {errors && (<span className="text-red-common p-3">{errors.identifier}</span>)}
                </div>
              </div>

              {/* password */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="password" className="capitalize md:text-lg text-xs">
                    {content.login_form_password} :
                  </label>
                  <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.password : ''} id={`password`} name="password" type="password" placeholder="Enter Your Password" 
                    className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                  />
                  {errors && (<span className="text-red-common p-3">{errors.password}</span>)}
                </div>
              </div>

              {/* submit */}
              <div>
                <button
                  type="submit"
                  className="group bg-blue-dark relative w-full flex justify-center py-3 px-4 text-xl text-white font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 group:hover:text-indigo-700" aria-hidden="true" />
                  </span>
                  {content.login_form_submit}
                </button>
              </div>
            </form>
          </div>
        </main>
      ) : null}
    </>
  )
}

export default LoginForm
