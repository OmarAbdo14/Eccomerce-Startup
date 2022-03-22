import React, { useContext,useState } from 'react'
import { UserCircleIcon, LogoutIcon, XCircleIcon, MenuIcon, BellIcon } from '@heroicons/react/outline';
import { Disclosure, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../Context/AdminContext';
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';
import { CogIcon, LibraryIcon, PlusCircleIcon, TableIcon, UserAddIcon } from '@heroicons/react/solid';

function Sidebar({ isShowing }) {
  const { loading, logout, } = useContext(AdminContext);
  const admin = Cookies.get('admin') && JSON.parse(Cookies.get('admin'));
  console.log('admin', admin);


  const isStatic = useMediaQuery({
    query: '(min-width: 764px)'
  });

  const permissions = {
    dashboard: [{ name: 'Dashboard', href: `/${JSON.parse($supportedLocales).current_lang}/dashboard/geofences/all`}],

    accounts: [
      { name: 'System Admins', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/accounts/all` },
      { name: 'Add new Account', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/accounts/addAccount` },
    ],
    users: [
      { name: 'Users Management', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/users/all` },
      { name: 'Add new User', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/users/addUser` },
    ],
    IoT_devices: [
      { name: 'IoT Devices Management', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/IoT_devices/all` },
      { name: 'Add new IoT Device', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/IoT_devices/addIoT_device` },
    ],
    geofences: [
      { name: 'Geofences Management', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/all` },
      { name: 'Add new Geofence', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/addGeofence` },
      { name: 'Geofences Matching', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/geofenceMatching` },
    ],
    scenarios: [
      { name: 'Scenarios Management', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/scenarios/all` },
      { name: 'Add new Scenario', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/scenarios/addScenario` },
    ],
    actions: [
      { name: 'Actions Management', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/actions/all` },
      { name: 'Add new Action', href: `/${JSON.parse($supportedLocales).current_lang}/managementSystem/actions/addAction` },
    ],
    reports : [{name:'Generate report', href: `/${JSON.parse($supportedLocales).current_lang}/reports/generateReport`},],
    notifications : [{name:'Notifications & Activities', href: `/${JSON.parse($supportedLocales).current_lang}/notifications`},],
    settings : [{name:'Settings', href: `/${JSON.parse($supportedLocales).current_lang}/settings`,},],
  };

  return (<>
    {!isEmpty(admin) && (
      <Disclosure>
        {(() => {
          let [close, setClose] = useState(false);
          
          return (<>
            <Disclosure.Button className="text-red-common absolute top-20 right-5 z-50">
              {!isStatic ? close ? (<XCircleIcon onClick={()=>{setClose(!close); console.log(close)}} className="h-8 w-8 float-right mt-3" />)
                : (<MenuIcon onClick={()=>{setClose(!close); console.log(close)}} className="h-8 w-8 float-right mt-3" />) : null}
            </Disclosure.Button>
            <div className={`${close ? 'z-40' : 'z-0'} min-h-screen absolute md:relative col-md-3 col-sm-12 flex flex-col ${close || isStatic ? ' bg-white' : 'bg-gray-light'}`}>
              <Transition
                show={close || isStatic}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className={''}  static>
                  <aside className={`  `}>
                    <h1 className='md:text-4xl sm:text-2xl text-xl text-center my-4 font-extrabold'>STDF</h1>
                    <div className="text-center">
                      {admin.image ? (
                        <img src={`../../../../${admin.image}`} className="h-20 w-1/4 mx-auto rounded-full block" alt="admin" />
                      )
                        : (<><UserCircleIcon className="h-20 w-1/4 mx-auto text-gray-400" /></>)}
                      <h2 className="mb-3 mt-2 md:text-xl sm:lg text-base text-blue-middle">{admin.full_name}</h2>
                      <hr className="w-2/3 mb-4 mx-auto"></hr>
                    </div>
                    
                    <div className={`${close ? 'h-0' : 'min-h-screen'}`}>
                      <ul className="">
                        {admin.permissions.map((permission, index) => {
                          switch (permission) {
                            case 'dashboard':
                              return permissions.dashboard.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} ><LibraryIcon className='float-left w-6 h-6 mr-2'/>{permission.name}</NavLink></li>
                              ))
                            case 'geofences':
                              return permissions.geofences.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} >{permission.name==='Geofences Management'? (<TableIcon className='float-left w-6 h-6 mr-2'/>) : (<PlusCircleIcon className='float-left w-6 h-6 mr-2'/>)}{permission.name}</NavLink></li>
                              ))
                            case 'actions':
                              return permissions.actions.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} >{permission.name==='Actions Management'? (<TableIcon className='float-left w-6 h-6 mr-2'/>) : (<PlusCircleIcon className='float-left w-6 h-6 mr-2'/>)}{permission.name}</NavLink></li>
                              ))
                            case 'IoT_devices':
                              return permissions.IoT_devices.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} >{permission.name==='IoT Devices Management'? (<TableIcon className='float-left w-6 h-6 mr-2'/>) : (<PlusCircleIcon className='float-left w-6 h-6 mr-2'/>)}{permission.name}</NavLink></li>
                              ))
                            case 'scenarios':
                              return permissions.scenarios.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} >{permission.name==='Scenarios Management'? (<TableIcon className='float-left w-6 h-6 mr-2'/>) : (<PlusCircleIcon className='float-left w-6 h-6 mr-2'/>)}{permission.name}</NavLink></li>
                              ))
                            case 'users':
                              return permissions.users.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} >{permission.name==='Users Management'? (<TableIcon className='float-left w-6 h-6 mr-2'/>) : (<UserAddIcon className='float-left w-6 h-6 mr-2'/>)}{permission.name}</NavLink></li>
                              ))
                            case 'accounts':
                              return permissions.accounts.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} >{permission.name==='System Admins'? (<TableIcon className='float-left w-6 h-6 mr-2'/>) : (<UserAddIcon className='float-left w-6 h-6 mr-2'/>)}{permission.name}</NavLink></li>
                              ))
                            case 'reports':
                              return permissions.reports.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} ><PlusCircleIcon className='float-left w-6 h-6 mr-2'/>{permission.name}</NavLink></li>
                                ))
                            case 'notifications':
                              return permissions.notifications.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} ><BellIcon className='float-left w-6 h-6 mr-2'/>{permission.name}</NavLink></li>
                                ))
                            case 'settings':
                              return permissions.settings.map((permission, index)=> (
                                <li key={index} className=" border-b-2"><NavLink activeClassName='bg-blue-dark text-white rounded-lg' className='pl-3 nav-link block py-3 hover:bg-gray-200 hover:xl:text-lg lg:text-base text-xs' to={`${permission.href}`} ><CogIcon className='float-left w-6 h-6 mr-2'/>{permission.name}</NavLink></li>
                              ))
                            }
                          })}
                        </ul>
                        <button onClick={(e) => { logout(); e.target.style = `cursor: wait`; }} type="button" className="relative bg-blue-100 w-full hover:bg-blue-200 text-blue-middle rounded p-3 my-5 md:text-base sm:text-sm text-xs">
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LogoutIcon className="h-5 w-5 group:hover:text-indigo-700" />
                          </span>
                          Logout
                        </button>
                    </div>
                  </aside>
                </Disclosure.Panel>
              </Transition>
            </div>
          </>)
        })}
      </Disclosure>
    )}
  </>)
}

export default Sidebar;
