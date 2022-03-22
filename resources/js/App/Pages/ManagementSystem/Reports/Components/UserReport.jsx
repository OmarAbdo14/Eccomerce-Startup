import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { GeneralContext } from '../../../../Context/GeneralContext';
import { ReportsContext } from '../../../../Context/ReportsContext';
import Spinner from './../../../../MainComponents/Spinner';

const UserReport = ({match, current_lang}) => {
  const { getContent, content } = useContext(GeneralContext);
  const { loading, message, report, getReportById } = useContext(ReportsContext);
  
  useEffect(async () => {
    await getReportById(match.params.id);
    await getContent();
  }, [match.params.id])
  
  return (
    <section className="w-11/12 mx-auto my-5">
      <div className="flex flex-col w-11/12 mx-auto rounded bg-white p-5">
        {loading && (
          <div className="flex flex-col justify-center items-center h-screen">
            <Spinner />
          </div>
        )}
        {!loading && content && (
          <div className="report-content">
            <div className="report-header">
              <h3 className="report-title text-center font-extrabold md:text-lg text-base" id="exampleModalLabel">{report.name}</h3>
              <button type="button" className="btn-close" data-bs-dismiss="report" aria-label="Close"></button>
            </div>
            <div className="report-body text-left flex flex-col">
              
              {/* report-details */}
              <section id="report-details" className="w-full">
                <h4 className="font-bold md:text-lg text-left text-base text-blue-light capitalize">report details</h4>
                <div className="font-bold md:text-base text-sm">
                  <p className="">ID: <span className="text-gray-common">{ report.report_ID }</span></p>
                  <p className="">Type: <span className="text-gray-common">{ report.report_location_type ? "active" : "passive" }</span></p>
                  {report.report_location_type ? (<p className="">
                    Geometric Shape: <span className="text-gray-common">{ report.report_type }</span>
                  </p>) : null}
                  
                  <p className=""> </p>
                  
                </div>
              </section>
              
              {/* associated-users */}
              {report.associated_users && report.associated_users.length>=1 && report.scenarios && report.scenarios.length >= 1 && !report.scenarios.find((scenario) => scenario.report_type_id == 1)  && (
                <section id="associated-users" className="w-full mt-5">
                  <h4 className="font-bold md:text-lg text-left text-base -mb-8 text-blue-light capitalize">associated users</h4>
                  {/* <UsersTable associated={true} users={ report.associated_users }/> */}
                </section>
              )}
          
              {/* current-users */}
              {report.current_users && report.current_users.length>=1 && (
                <section id="associated-users" className="w-full mt-5">
                  <h4 className="font-bold md:text-lg text-left text-base -mb-8 text-blue-light capitalize">current users</h4>
                  {/* <UsersTable report={report} associated={false} users={ report.current_users }/> */}
                </section>
              )}
            </div>      
          </div>
        )}
      </div>
    </section>
  )
}

export default withRouter(UserReport);
