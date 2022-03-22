import React, {useEffect, useContext} from 'react'
import ActionsTable from './Components/ActionsTable';

import { ActionsContext } from '../../../Context/ActionsContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllActionsPage = () => {
  const { loading, message, getAllActions, actions } = useContext(ActionsContext);  
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllActions();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All Actions</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (<>
        {(!(actions.length>=1) || message==='There is not any action') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`There is not any action`}</h1>
          </div>
        ) : null}
          
        {actions.length >= 1 ? (
          <>
            <Search array={actions} />
            <ActionsTable />
          </>
        ) : null}
      </>)}
    </div>
  )
}

export default AllActionsPage
