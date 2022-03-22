import React, {useEffect, useContext} from 'react'
import AccountsTable from './Components/AccountsTable';

import { AccountsContext } from '../../../Context/AccountsContext';
import Spinner from './../../../MainComponents/Spinner';
import Search from './../../../MainComponents/Search';
import { GeneralContext } from '../../../Context/GeneralContext';


const AllAccountsPage = () => {
  const { loading, message, getAllAccounts, accounts } = useContext(AccountsContext);
  const { getContent, content } = useContext(GeneralContext);


  useEffect(async () => {
    await getAllAccounts();
    await getContent();

  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg font-bold text-blue-dark mb-5">All Accounts</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (
        <>
          {(!(accounts.length>=1) || message==='There is not any account') ? (
            <div className="flex flex-col justify-center items-center h-screen">
              <h1 className="text-center font-extrabold text-2xl">{`There is not any account`}</h1>
            </div>
          ) : null}
            
          {accounts.length >= 1 && message === 'All accounts has been returned successfully' ? (
            <>
              <Search array={accounts} />
              <AccountsTable />
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default AllAccountsPage
