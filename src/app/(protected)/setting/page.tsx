"use client"

import { useSession } from 'next-auth/react'

import { logout } from '../../../../action/signout';

const settingPage = async () => {
  
  const session = useSession();

  const onClick = () =>{
    logout();
  }
  return (
    <div>
        {JSON.stringify(session)}
            <button  onClick={onClick} type='submit'>
                Sign out
            </button>
    </div>
  )
}

export default settingPage