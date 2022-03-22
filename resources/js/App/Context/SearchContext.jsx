import React, { useReducer } from "react";
import * as TYPES from "./types";
import {API} from "../API";

const SearchContext = React.createContext();

const SearchState = (props) => {
  const initialState = {
    searchResult: [],
  };

  const [state, dispatch] = useReducer(SearchReducer, initialState);

  function getCommonObjects(data) {
    let flattened = data.reduce((a, b) => a.concat(b), []);
    // console.log(flattened);
    let counts = flattened.reduce((map, { id }) => map.set(id, (map.get(id) || 0) + 1), new Map());
    // let found = data.length>=1 && data[0].filter(({ id }) => counts.get(id) === data.length);
    return flattened
  }

  const search = async (FilterSearch, array) => {
    console.log('search', FilterSearch, array);
    if(FilterSearch === '' || !FilterSearch) {
      dispatch({
        type: TYPES.SEARCH, payload: {
        searchResult: array,
      }})
    } else {
      const excludeColumns  = ['id', 'created_at', 'updated_at', 'violations_count',];
      const lowerCaseValue = FilterSearch.trim();
      if(lowerCaseValue) {
        let data = [...array];
        data = data.filter(obj => {
          return Object.keys(obj).find(key => !excludeColumns.includes(key) && obj[key] === lowerCaseValue)
        })
        console.log(data);        
        dispatch({type: TYPES.SEARCH, payload: {
          searchResult: data,
        }});
      }
    }
  }

  // const search = async (FilterSearch) => {
  //   console.log(FilterSearch);
  //   if(FilterSearch === '' || !FilterSearch) {
  //     dispatch({type: TYPES.SEARCH, payload: {
  //       geofences: state.geofences,
  //     }})
  //   } else {
  //     const resp = await GeofencesAPI.get(`/search`, {
  //       params: {keyword: state.geofencesFilterSearch.toLowerCase().trim()}
  //     }).then((response)=> {
  //       if(response.data) {
  //         console.log('searched');
  //         console.log(response);
  //         dispatch({type: TYPES.SEARCH, payload: {
  //           geofences: response.data.geofences,
  //         }})
  //       } else {
  //         // dispatch(type:) {}
  //       }
  //     }).catch((error)=> {
  //       if(error.hasOwnProperty('response')) {
  //         dispatch({ 
  //           type: TYPES.VALIDATION_ERRORS, payload: { 
  //           message: error.response.data.message,
  //           errors: error.response.data.errors,
  //           status: error.response.status, 
  //         }});
  //         console.log(error);
  //         swal({
  //           title: "Sorry!",
  //           text: error.response.data.message,
  //           icon: "error",
  //           button: "OK",
  //         });
  //       }
  //     });
  //   }
  // }


  return (
    <SearchContext.Provider 
      value={{ 
        searchResult: state.searchResult, 
        search, 
        getCommonObjects,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

const SearchReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SEARCH:
      return {
        ...state,
        searchResult: action.payload.searchResult  ? action.payload.searchResult: [],
      };
    default:
      return state;
  }
};

export { SearchState, SearchContext };
