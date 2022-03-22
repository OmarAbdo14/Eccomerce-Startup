import { UserCircleIcon } from '@heroicons/react/outline';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import React, {useEffect, useContext} from 'react'
import { Link, } from "react-router-dom";
import { AccountsContext, } from '../../../../Context/AccountsContext';
import { SearchContext, } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';


// currentQuarantines = quarantinesFilterMode === 'all' ? currentQuarantines : currentQuarantines.filter((quarantine)=>{return quarantine.user.status === quarantinesFilterMode});


const AccountsTable = () => {  
  const cols = ['Admin', 'Email', 'Actions'];
  const {  accounts, deleteAccount  } = useContext(AccountsContext);
  const { searchResult, search } = useContext(SearchContext);

  async function deleteHandler(id) {
    await deleteAccount(id);  
  };

  useEffect(() => {
    search('', accounts)
  }, [])
  console.log(searchResult);
  var currentAccounts = [...searchResult];

  return (
    <>
      {currentAccounts.length>=1 ? (
        <>
          <Alert />
          <section className="flex flex-col my-5 w-full">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="divide-y divide-gray-200 w-full text-left">
                    <thead className="divide-y bg-gray-50">
                      <tr>
                        {cols.map((col,index)=> (
                          <th key={index} scope="col" className={`py-3 pl-3 text-xs font-medium text-gray-500 uppercase tracking-wider`}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-gray-200">
                      {accounts.map((account, index) => (
                        <tr key={index}>
                          {/* user */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="flex-shrink-0 h-10 w-10">
                                
                                {account.image ? (<img className="h-10 w-10 rounded-full" src={account.image ? `../../../../../../../${account.image}` : '-'} alt="" />) : (<UserCircleIcon className="" />)}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{account.username ? account.username : '-'}</p>
                              </div>
                            </div>
                          </td>
                          
                          {/* email */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{account.email ? account.email : '-'}</p>
                            {/* <p className="text-sm text-gray-500">{user.department}</p>  */}
                          </td>

                          {/* actions */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-start flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/accounts/editAccount/${account.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(account.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any account`}</h1>
        </div>
      )}
    </>
  );
}

export default AccountsTable
