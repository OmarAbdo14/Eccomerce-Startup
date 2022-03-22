import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { ScenariosContext } from '../../../../Context/ScenariosContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from './../../../../MainComponents/Alert';

const ScenariosTable = () => {
  const cols = ['Name', 'Geofence', 'Geofence Type', 'Capacity Limit', 'Actions'];
  
  const { scenarios, deleteScenario } = useContext(ScenariosContext);
  const { searchResult, search } = useContext(SearchContext);
  
  useEffect(() => {
    search('', scenarios)
  }, [])
  console.log(searchResult);
  var currentScenarios = [...searchResult];

  async function deleteHandler(id) {
    await deleteScenario(id); 
  };
  
  return (
    <>
      {currentScenarios.length>=1 ? (
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
                      {currentScenarios.map((scenario, index) => (
                        <tr key={index}>
                          {/* name */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{scenario.name}</p>
                          </td>

                          {/* geofence name */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{scenario.geofence ? scenario.geofence.name : "-"}</p>
                          </td>

                          {/* geofence type */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{scenario.geofence_type ? scenario.geofence_type.name : "-"}</p>
                          </td>

                          {/* capacity limit */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{scenario.capacity_limit ? scenario.capacity_limit : "-"}</p>
                          </td>

                          <td className="py-4 pl-3 whitespace-nowrap flex justify-center flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/scenarios/editScenario/${scenario.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(scenario.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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

export default ScenariosTable
