const RemainingDays = ({endDate})=> {
  let d= new Date(endDate); 
  // return <p className="text-sm text-gray-900">{d.setDate(endDate.getDate() - new Date())}</p>;
  // return <p className="text-sm text-gray-900">{Math.floor(Math.abs(new Date(endDate) - new Date())/100/3600/24)}</p>;
  return <p className="text-sm text-gray-900">{parseInt(Math.abs(new Date(endDate) - new Date())/1000/3600/24) +1}</p>;
  
}

export default RemainingDays; 