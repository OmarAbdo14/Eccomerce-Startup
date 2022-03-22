import React, {useEffect, useContext} from 'react'
import ScenariosTable from './Components/ScenariosTable';

import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { ScenariosContext } from '../../../Context/ScenariosContext';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllScenariosPage = () => {
  const { loading, message, getAllScenarios, scenarios } = useContext(ScenariosContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllScenarios();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All Sceanrios</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (<>
        {(!(scenarios.length>=1) || message==='there is not any scenario') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`there is not any scenario`}</h1>
          </div>
        ) : null}
          
        {scenarios.length >= 1 && message === 'All scenarios has been returned successfully' ? (
          <>
            <Search array={scenarios.map((scenario, index)=>{return scenario.geofences ? scenario.geofences.map((geofence, index)=>{return {...scenario, ['geofence_name']: geofence.name}}) : scenario})} />
            <ScenariosTable />
          </>
        ) : null}
      </>)}
    </div>
  )
}

export default AllScenariosPage
