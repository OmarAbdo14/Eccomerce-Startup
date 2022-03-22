import React, {useContext, useRef} from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { SearchContext } from '../Context/SearchContext';

const Search = ({array}) => {
  const { search } = useContext(SearchContext);
  const searchInput = useRef(null);

  return (
    <div className="relative w-2/3 flex flex-row">
      <button className='bg-white pl-3'><SearchIcon className="w-6  my-3 text-blue-dark" /></button>
      <input type="text" ref={searchInput} onChange={(e)=>{search(e.target.value, array)}}
        name="search" id={`searchInput`} placeholder="Search for a user, quarantine, etc..." className="text-center lg:text-lg md:text-base sm:text-sm py-2.5 w-full pr-16 "/> 
    </div>
  )
}

export default Search;
