import React, {useEffect, useContext} from 'react'
import IoTDevicesTable from './Components/IoTDevicesTable';

import { IoT_devicesContext } from '../../../Context/IoT_devicesContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllIoTDevicesPage = () => {
  const { loading, message, getAllIoT_devices, IoT_devices } = useContext(IoT_devicesContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllIoT_devices();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All IoT Devices</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (
        <>
          {(!(IoT_devices.length>=1) || message==='There is not any IoT device') ? (
            <div className="flex flex-col justify-center items-center h-screen">
              <h1 className="text-center font-extrabold text-2xl">{`There is not any IoT device`}</h1>
            </div>
          ) : null}
            
          {IoT_devices.length >= 1 && message === 'All IoT devices has been returned successfully' ? (
            <>
              <Search array={IoT_devices} />
              <IoTDevicesTable />
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default AllIoTDevicesPage
