import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { GeofencesContext } from '../../../../Context/GeofencesContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from './../../../../MainComponents/Alert';

const GeofencesTable = () => {
  const { geofences, deleteGeofence,} = useContext(GeofencesContext);
  const { searchResult, search } = useContext(SearchContext);
  
  const cols = ['Name', 'Type', 'Geometric Shape', 'IoT Device', //'radius', 'points_list',
    'Actions'];

  useEffect(() => {
    search('', geofences)
  }, [])
  console.log(searchResult);
  var currentGeofences = [...searchResult];
  
  async function deleteHandler(id) {
    await deleteGeofence(id); 
  };
  
  return (
    <>
      {currentGeofences.length>=1 ? (
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
                      {currentGeofences.map((geofence, index) => (
                        <tr key={index}>
                          {/* name */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{geofence.name}</p>
                          </td>

                          {/* active or passive */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{geofence.geofence_location_type ? "Active" : "Passive"}</p>
                          </td>

                          {/* geofence type */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{geofence.geofence_type ? geofence.geofence_type : "-"}</p>
                          </td>

                          {/* IoT Device */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{geofence.i_o_t_device ? geofence.i_o_t_device.name : "-"}</p>
                          </td>

                          {/* radius */}
                          {/* <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{geofence.geofence_type === 'circular' ? geofence.radius : "-"}</p>
                          </td> */}

                          {/* points list */}
                          {/* <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{geofence.points_list ? geofence.points_list.map((point, index)=> `[${point[0]}, ${point[1]}]${index+1===geofence.points_list ? `, ` : ''}`) : "-"}</p>
                          </td> */}

                          {/* actions */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-center flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/geofences/editGeofence/${geofence.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(geofence.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any geofence`}</h1>
        </div>
      )}
    </>
  )
}

export default GeofencesTable
