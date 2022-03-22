import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
import { AdminContext } from '../Context/AdminContext';

const Protected = ({children, current_lang}) => {
  const {getAdmin, setAuth,} = useContext(AdminContext);

  const history = useHistory();
  useEffect(async() => {
    if(Cookies.get('admin')) {
      await setAuth(true);
      await getAdmin();
      console.log('protected');
      console.log(JSON.parse(Cookies.get('admin')).email);
    } else {
      history.replace(`/${current_lang}/login`);
    }
  }, [])

  return (
    <>
      { Cookies.get('admin') && (
        <>{children}</>
      )} 
    </>
  )
}

export default Protected
