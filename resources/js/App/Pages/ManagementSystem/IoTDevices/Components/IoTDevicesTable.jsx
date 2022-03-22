import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { IoT_devicesContext } from '../../../../Context/IoT_devicesContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const IoTDevicesTable = () => {
  const cols = ['Name', 'IoT ID', 'Status', 'Geofence', 'Actions',];
  
  const { IoT_devices, deleteIoT_device, } = useContext(IoT_devicesContext);
  const { searchResult, search } = useContext(SearchContext);
  
  async function deleteHandler(id) {
    await deleteIoT_device(id); 
  };

  useEffect(() => {
    search('', IoT_devices)
  }, [])
  console.log(searchResult);
  var currentIoT_devices = [...searchResult];
  
  return (
    <>
      {currentIoT_devices.length>=1 ? (
        <>
          <Alert />
          <section className="flex flex-col my-5 w-full">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="divide-y divide-gray-200 w-full text-center">
                    <thead className="bg-gray-50">
                      <tr>
                        {cols.map((col,index)=> (
                          <th key={index} scope="col" className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider`}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {currentIoT_devices.map((IoT_device, index) => (
                        <tr key={index}>
                          {/* Name */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{ IoT_device.name }</p>
                          </td>

                          {/* ID */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{ IoT_device.IoT_ID }</p>
                          </td>

                          {/* Status */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{ IoT_device.status}</p>
                          </td>

                          {/* Geofence */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{ IoT_device.geofence ? IoT_device.geofence.name : "-" }</p>
                          </td>
                        
                          {/* Actions */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-center flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/IoT_devices/editIoT_device/${IoT_device.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(IoT_device.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
                          </td> 
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`There is not any IoT Device`}</h1>
        </div>
      )}
    </> 
  )
}

export default IoTDevicesTable
