import React, {useEffect, useContext} from 'react'


const UsersTable = ({associated, report_geofence, users}) => {  
  const cols = ['User', 'Status', 'Violations No.', 'Associated', ];
  // const { searchResult, search } = useContext(SearchContext);

  useEffect(() => {
    // search('', users)
  }, [])
  


  return (<>
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
                {users.map((user, index) => (
                  <tr key={index}>
                    {/* username */}
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-center items-center text-left">
                        <div className="ml-4">
                          <p className="text-sm text-gray-500">{user.username ? user.username : '-'}</p>
                        </div>
                      </div>
                    </td>

                    {/* status */}
                    <td className="py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{user.status ? user.status : '-'}</p>
                    </td>

                    {/* Violations Count */}
                    <td className="py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{ user.violations_count ? user.violations_count : '-' }</p>
                    </td>

                    {/* Associated */}
                    <td className="py-4 whitespace-nowrap">
                      {/* <p className="text-sm text-gray-900">[{user.associated_geofences && user.associated_geofences.length>=1 ? user.associated_geofences.map((geofence, index)=> `${geofence.name}${index+1===user.associated_geofences.length ? '' : `, `}`) : "-"}]</p> */}
                    </td> 

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>    
  </>);
}

export default UsersTable
