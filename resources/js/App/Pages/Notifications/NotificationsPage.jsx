import React, {useContext, useEffect} from 'react'
import { GeneralContext } from '../../Context/GeneralContext';

import { NotificationsContext } from '../../Context/NotificationsContext';
import Search from '../../MainComponents/Search';
import Sidebar from '../../MainComponents/Sidebar';
import Spinner from '../../MainComponents/Spinner';
import NotificationsList from './Components/NotificationsList';

const NotificationsPage = () => {
  const { getContent, content } = useContext(GeneralContext);
  const { loading, message, getAllNotifications, notifications, setNotificationsFilterMode, } = useContext(NotificationsContext);  

  
  useEffect(async () => {
    await getAllNotifications();
    await getContent();
  }, []);
  
  return (<>
    <Sidebar />
    <main className="bg-gray-light col px-0">
      <div className="w-11/12 mx-auto my-5">
        {loading && (
          <div className="flex flex-col justify-center items-center h-screen">
            <Spinner />
          </div>
        )}

        {!loading && content && (<>
          <h1 className="text-lg font-bold text-blue-dark mb-5">{content.notifications_title}</h1>
          <Search array={notifications} />
          <section className="flex flex-row flex-wrap mt-5 gap-y-5 lg:justify-between justify-start -mx-2">
            {(!(notifications.length >= 1) || message === 'There is not any notification') ? (
              <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-center font-extrabold text-2xl">{`There is not any notification`}</h1>
              </div>
            ) : null}
            
            {notifications.length >= 1 && message === 'All notifications has been returned successfully' ? (<>
              <div className='flex w-full flex-row flex-wrap mt-5 gap-y-5 lg:justify-between justify-start -mx-2'>
                <NotificationsList />
              </div>
            </>) : null}
          </section>
        </>)}
      </div>
    </main>
  </>)

  return (<>
    
        
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
  </>)
}

export default NotificationsPage
