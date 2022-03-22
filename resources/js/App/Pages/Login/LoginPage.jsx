import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { AdminContext } from '../../Context/AdminContext'

import LoginForm from './Components/LoginForm'
import Cookies from 'js-cookie'


const LoginPage = ({current_lang}) => {
  // const {admin} = useContext(AdminContext);
  const history = useHistory();
  useEffect(() => {
    // await getAdmin();
    if(Cookies.get('admin')) {
      history.replace(`/${current_lang}/dashboard/geofences`);
    }
  }, [])

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-nowrap md:flex-row flex-col h-screen'>
          <img src='../../../../../images/login-background.png' className='md:w-1/2 w-full md:h-full h-64 block' />
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default LoginPage

