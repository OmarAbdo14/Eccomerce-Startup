import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { UserCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { NotificationsContext } from '../../Context/NotificationsContext';
import Spinner from '../../MainComponents/Spinner';
import { AlertContext } from '../../Context/AlertContext';
import Alert from '../../MainComponents/Alert';
import Tabs from '../../MainComponents/Tabs';
import Sidebar from '../../MainComponents/Sidebar';
import { GeneralContext } from '../../Context/GeneralContext';


const Notifications = () => {
  const { loading, message, getAllNotifications, notifications, notificationsFilterMode, setNotificationsFilterMode, deleteNotification } = useContext(NotificationsContext);
  const { alert } = useContext(AlertContext);
  const { getContent, content } = useContext(GeneralContext);
  
  useEffect(async () => {
    await getAllNotifications();
      await getContent();
  }, []);

  async function deleteHandler(id) {
    await deleteNotification(id);  
  };


  var currentNotifications = [...notifications];
  currentNotifications = notificationsFilterMode === 'all' ? currentNotifications : currentNotifications.filter((notification)=>{return notification.title === notificationsFilterMode});

  return (<>
    <Sidebar />
    <main className="bg-gray-light col px-0">
      <div className="w-11/12 mx-auto my-5">
        <h1 className="text-lg text-blue-dark font-bold mb-5">Notifications & Activities</h1>
        {loading && (
          <div className="flex flex-col justify-center items-center h-screen">
            <Spinner />
          </div>
        )}
        
        {!loading && message === 'There is not any notification' ? (
          <>
            <div className="flex flex-col justify-center items-center h-screen">
              <h1 className="text-center font-extrabold text-2xl">{`There is not any notification`}</h1>
            </div>
          </>
        ) : null}
        
        {!loading && notifications.length >= 1 && (
          <>
            <Alert />
            <div className="align-middle bg-white w-full rounded-lg text-left shadow-xl">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:flex-col sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="my-6 flex flex-col-reverse gap-y-3">
                      {notifications.map((notification, index)=> (
                        <div key={index} className={`notification-item flex flex-row items-center w-full ${notifications.length>1 ? ' pb-4 border-bottom border-b-4' : ''}`}>
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
                            <span className="text-blue-300">updated at: <span className="text-gray-common">{Date(notification.updated_at)}</span></span>
                          </div>
                          <div className="w-1/12">
                              <button className="" type="button" onClick={()=>deleteHandler(notification.id)}><XCircleIcon className="h-5 w-5 text-indigo-500 group:hover:text-indigo-700" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>    
          </> 
        )}
      </div>
    </main>
  </>)
}

export default Notifications
