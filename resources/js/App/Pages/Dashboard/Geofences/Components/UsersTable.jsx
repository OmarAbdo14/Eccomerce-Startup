import React from 'react'

const UsersTable = (props) => {
  let { users, associated } = props;
  
  const cols = associated ? ['User', 'Email'] : ['User', 'Email', "Is Associated"];

  return (
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
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-center items-center text-left">
                        <div className="ml-4">
                          <p className="text-sm text-gray-500">{user.username ? user.username : '-'}</p>
                        </div>
                      </div>
                    </td>
                    
                    {/* email */}
                    <td className="py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{user.email ? user.email : '-'}</p>
                    </td>

                    {/* current geofence */}
                    {!associated && (
                    <td className="py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{props.geofence && props.geofence.associated_users.map((ass_user)=>ass_user.id===user.id ? true : false).includes(true) ? 'Associated' : 'Not Associated'}</p>
                    </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UsersTable
