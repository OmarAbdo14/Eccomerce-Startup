import React, {useContext, useEffect} from 'react'
import { GeneralContext } from '../../../Context/GeneralContext';
import { NotificationsContext } from '../../../Context/NotificationsContext';
import { SearchContext } from '../../../Context/SearchContext';


import Notification from './Notification';


const NotificationsList = () => {
  const { searchResult, search } = useContext(SearchContext);
  const { notifications, } = useContext(NotificationsContext);
  const { loading, getContent, content } = useContext(GeneralContext);
  
  useEffect(async () => {
    search('', notifications)
    await getContent();
  }, []);

  console.log(searchResult);
  var currentNotifications = [...searchResult];
  const notificationsCols = [
    // log messages
    currentNotifications.filter((notification) => notification.type && notification.type === 'log'),
    // notifications
    currentNotifications.filter((notification) => notification.type && notification.type === 'notification'),
  ];
  
  const titles = [content.notification_type_log, content.notification_type_notification,];
  const colors = ['yellow-400', 'gray-400'];

  return (<>
    {notificationsCols.map((notifications, index) => (
      <section key={index} className="md:w-1/2 sm:w-1/2 w-full px-2">
        <h3 className={`border-l-4 px-1.5 border-${colors[index]} md:text-xl sm:text-lg text-base`}>{titles[index]} ({ notifications.length })</h3>
        <div className='flex flex-col gap-y-2 mt-4'>
          {notifications.map((notification, index2) => (
            <Notification key={index2} notification={ notification }/>
          ))}
        </div>
      </section>
    ))}    
  </>)
}

export default NotificationsList
