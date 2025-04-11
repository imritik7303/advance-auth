"use client"

import { logout } from "../../../action/signout"

interface logoutButtonProps {
     children ?: React.ReactNode
};

export const LogOutButton = ({children} : logoutButtonProps)=>{
    const OnClick = () =>{
        logout()
   }
   
   return(
     <span onClick={OnClick} className="cursor-pointer">
         {children}
     </span>
   )
}