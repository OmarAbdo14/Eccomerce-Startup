import React from 'react'

const ScenariosTable = ({scenarios}) => {
  const cols = ['Name', 'Geofence', 'Geofence Type', 'Capacity Limit', 'Action', 'Actions'];

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
                {scenarios.map((scenario, index) => (
                  <tr key={index}>
                    <td className="py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{scenario.name}</p>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{scenario.geofence_type ? scenario.geofence_type.type : "-"}</p>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{scenario.capacity_limit ? scenario.capacity_limit : "-"}</p>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{scenario.action ? scenario.action.name : "-"}</p>
                    </td>
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

export default ScenariosTable
