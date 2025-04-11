"use client"

import {User2Icon , LogOut} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"
import { useCurrentUser } from "../../../hooks/use-current-user"
import { LogOutButton } from "./logout-button"

export const UserButton = ()=>{
  const user = useCurrentUser();
    return (
           <DropdownMenu>
               <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user?.image || undefined}/>
                    <AvatarFallback className="bg-sky-500">
                        <User2Icon className="text-white"/>
                    </AvatarFallback>
                  </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-40" align="end">
                <LogOutButton>
                    <DropdownMenuItem>
                        <LogOut className="h-4 w-4 mr-4"/>
                        Logout
                    </DropdownMenuItem>
                </LogOutButton>
               </DropdownMenuContent>
           </DropdownMenu>
        
    )
}