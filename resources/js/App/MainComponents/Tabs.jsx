import React, {useState, useContext} from 'react';


const Tabs = ({ color, setFilterMode, tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <>
      <ul
        className=" mb-0 list-none pt-3 pb-4 w-full flex flex-row flex-nowrap"
        role="tablist"
      >
        <li className="last:mr-0 lg:w-1/5 md:w-1/2 lg:mt-0 mt-2 w-full text-center">
          <a
            className={
              "text-xs font-bold uppercase p-3 mx-2 h-full shadow-lg rounded block leading-normal " +
              (selectedTab === 0
                ? "text-white bg-" + color
                : "text-blue-dark bg-gray-200")
            }
            onClick={ ()=> {
              setSelectedTab(0);
              setFilterMode('all');
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            All
          </a>
        </li>

        {tabs.map((tab,index)=> (
          <li key={index} className="last:mr-0 lg:w-1/5 md:w-1/2 lg:mt-0 mt-2 w-full text-center">
            <a
              className={
                "text-xs font-bold uppercase p-3 mx-2 h-full shadow-lg rounded block leading-normal " +
                (selectedTab === index+1
                  ? "text-white bg-" + color
                  : "text-blue-dark"+ tab.filterMode === 'normal' ? "bg-green-400" : "bg-gray-300")
              }
              onClick={ ()=> {
                setSelectedTab(index+1);
                setFilterMode(tab.filterMode);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              {tab.name}
            </a>
        </li>
        ))}
      </ul>
    </>
  );
};

export default Tabs;