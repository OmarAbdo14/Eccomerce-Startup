import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { ActionsContext } from '../../../../Context/ActionsContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const ActionsTable = () => {
  const { actions, deleteAction,} = useContext(ActionsContext);
  const { searchResult, search } = useContext(SearchContext);
  
  const cols = ['Name', 'Type', 'Message', 'Actions'];

  useEffect(() => {
    search('', actions)
  }, [])
  console.log(searchResult);
  var currentActions = [...searchResult];
  
  async function deleteHandler(id) {
    await deleteAction(id); 
  };
  
  return (
    <>
      {currentActions.length>=1 ? (
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
                      {currentActions.map((action, index) => (
                        <tr key={index}>
                          {/* name */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{action.name}</p>
                          </td>

                          {/* type */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{action.type}</p>
                          </td>

                          {/* message */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{action.message}</p>
                          </td>
                          
                          {/* actions */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-center flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/actions/editAction/${action.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(action.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any action`}</h1>
        </div>
      )}
    </>
  )
}

export default ActionsTable
