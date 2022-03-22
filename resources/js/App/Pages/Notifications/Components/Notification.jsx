import React, { useContext } from 'react'
import { GeneralContext } from '../../../Context/GeneralContext';
import { UserCircleIcon, XCircleIcon } from '@heroicons/react/outline';

const Notification = ({ notification }) => {
  const { content } = useContext(GeneralContext);

  return (<>
    {notification && content && (<>
      <div className={`bg-white shadow-sm p-3 notification-item flex flex-row items-center w-full pb-4 border-bottom border-b-4}`}>
        <div className="w-11/12">
          <div className="flex flex-row items-center">  
            {notification.image ? (<>
              <div className="h-10 w-10 ml-3">
                <img className="h-10 w-10 rounded-full" src={notification.image} alt="" />
              </div>
            </>) : (<>
              <UserCircleIcon className="h-20 w-20 text-gray-400 mr-2"/>
            </>)}
            <p className="text-blue-dark font-bold">{notification.title}</p>
          </div>
          <span className="text-blue-300">created at: <span className="text-gray-common">{Date(notification.created_at)}</span></span><br />
        </div>
        <div className="w-1/12">
            <button className="" type="button" onClick={()=>deleteHandler(notification.id)}><XCircleIcon className="h-5 w-5 text-indigo-500 group:hover:text-indigo-700" /></button>
        </div>
      </div>
    </>)}
  </>)
}

export default Notification;
