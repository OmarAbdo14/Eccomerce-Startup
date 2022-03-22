import React from 'react';

import Select from 'react-select';


const DropdownSingleSearchList = ({ name, defaultArray, array, setInput }) => {
  const options = array.map((el, index) => {
    return {
      value: el.hasOwnProperty('id') ? el.id : el,
      label: el.hasOwnProperty('name') ? el.name : el,
    };
  });
  const defaultOptions = defaultArray.map((el, index) => {    
    return {
      value: el.id ? el.id : el,
      label: el.name ? el.name : el,
    };
  })
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  // console.log(defaultArray);
  // console.log(defaultOptions);

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
      name={name}
      onChange={(e) => setInput({target: {name: name, value: e.value,}})}
      options={options}
      defaultValue={defaultOptions}
      styles={customStyles }  
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
  
}

export default DropdownSingleSearchList;
