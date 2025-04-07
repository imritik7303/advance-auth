import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";

//prisma does not work on egdge so we  created an auth config file and imported it here


import {apiAuthPrefix ,DEFAULT_LOGIN_REDIRECT ,
authRoutes ,
publicRoutes} from "@/routes"



const {auth} = NextAuth(authConfig);
 
export default auth((req) => {
  const {nextUrl} = req
  console.log(nextUrl)
  const isLoggedIn = !!req.auth;
  console.log(isLoggedIn);
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  const isPublicRoute  = publicRoutes.includes(nextUrl.pathname)

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if(isApiAuthRoute){
    return  ;
  }
  if(isAuthRoute){
    if(isLoggedIn){
      return  Response.redirect(new URL(nextUrl.origin + DEFAULT_LOGIN_REDIRECT) ,301)
    }
    return 
  }
  if(!isLoggedIn && !isPublicRoute){
    return  Response.redirect(new URL(nextUrl.origin + "/auth/login"))
  }
  return

})


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }