import React from 'react';

import Select from 'react-select';


const DropdownMultipleSearchList = ({ name, defaultArray, array, setInput }) => {
  const options = array.map((el, index) => {
    return {
      value: el.id ? el.id : el,
      label: el.name ? el.name : el,
    };
  });
  const defaultOptions = defaultArray.map((el, index) => {
    return {
      value: el.id ? el.id : el,
      label: el.name ? el.name : el,
    };
  })
  
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#d9efff",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "black" : "#dee2e6",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "black" : "#dee2e6"
      },
      padding: '0.70rem',
      color: '#1e1a33',
      borderRadius: '0.25rem 0.25rem 0 0',
      
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
      color: '#5299e1',
      
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    })
  };

  return (
    <Select
    defaultValue={defaultOptions}
    isMulti
    name={name}
    onChange={(e) => setInput({target: {name: name, value: e.map((el, index) => el.value),}})}
    options={options}
    styles={customStyles }  
    className="basic-multi-select"
    classNamePrefix="select"
  />
  );
}
  
export default DropdownMultipleSearchList;