"use client"



import { logout } from '../../../../action/signout';
import { useCurrentUser } from '../../../../hooks/use-current-user';

const settingPage = async () => {
  
  const user = useCurrentUser();

  const onClick = () =>{
    logout();
  }
  return (
    <div>
        
            <button  className='bg-white p-10 rounded-xl' onClick={onClick} type='submit'>
                Sign out
            </button>
    </div>
  )
}

export default settingPage