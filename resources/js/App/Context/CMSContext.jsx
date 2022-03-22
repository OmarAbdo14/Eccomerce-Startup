import React, { useReducer } from "react";
import {API} from "../API";

import * as TYPES from "./types";

const CMSContext = React.createContext();

const CMSState = (props) => {
  const initialState = {
    loading: false,
    home_content: [],
    
  };

  const [state, dispatch] = useReducer(cmsReducer, initialState);


  return (
    <CMSContext.Provider
      value={{
        

      }}
    >
      {props.children}
    </CMSContext.Provider>
  );
};

const cmsReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    
    default:
      return state;
  }
};

export { CMSContext, CMSState };
