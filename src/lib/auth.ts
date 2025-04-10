import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/lib/db"
import { getUserById } from "../../data/user"
import { getTwoFactorConfirmationByUserId} from "../../data/two-factor-confirmation"
import { UserRole } from "@prisma/client"
export const { handlers:{GET ,POST},  auth  ,signIn ,signOut} = NextAuth({
pages:{
  signIn : "/auth/login",
  error : "/auth/error",
},
events : {
async linkAccount({user}){
  await db.user.update({
    where:{id:user.id},
    data:{emailVerified :new Date()}
  })
} 
},
 callbacks :{
  async signIn({user , account}){
  //allow OAuth provider without email
  if(account?.provider !== "credentials") return true
  if(!user.id) return false
  const existingUser = await getUserById(user.id)

  //pevent sign without email verfifcation
  if(!existingUser?.emailVerified ) return false

  //2Fa
  if(existingUser.isTwoFactorEnabled){
    const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

    if(!twoFactorConfirmation) return false;

    //delete 2Fa for next sign in

    await db.twoFactorConfirmation.delete({
      where :{id : twoFactorConfirmation.id}
    })

  }

  return true
  },
  //session does not have the id by default so we need to extrect it from the token.sub  
  async session({token ,session }){
    if(token.sub && session.user){
      session.user.id = token.sub
    }
    if(token.role && session.user){
      session.user.role = token.role as UserRole
    }
    return session
  },
     async jwt({token}) {
      console.log(token);
      if(!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token
      token.role = existingUser.role
      return token
     }
 },
  adapter : PrismaAdapter(db),
  session :{strategy:"jwt"},
  ...authConfig,
})