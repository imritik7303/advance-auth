"use client" 
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { usePathname } from "next/navigation"
import { UserButton } from "@/components/auth/user-button"


export const Navbar = () =>{

    const pathname = usePathname() 
    return (
        <div className="bg-secondary flex justify-between items-center p-4 rounded-xlw-[600px] shadow-sm gap-x-3">
            <div className="flex gap-x-4">
            
            <Button asChild 
                variant={pathname === "/server" ? "default" : "outline"}
                >
                  <Link href="/server">
                    Server
                  </Link>
                </Button>
                <Button asChild 
                variant={pathname === "/client" ? "default" : "outline"}
                >
                  <Link href="/client">
                    Client
                  </Link>
                </Button>
                <Button asChild 
                variant={pathname === "/admin" ? "default" : "outline"}
                >
                  <Link href="/admin">
                    Admin
                  </Link>
                </Button>
                <Button asChild 
                variant={pathname === "/setting" ? "default" : "outline"}
                >
                  <Link href="/setting">
                    Setting
                  </Link>
                </Button>
            </div>
            <UserButton/>
        </div>
    )
}