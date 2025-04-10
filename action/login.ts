"use server"
import * as z from "zod"

import { LoginSchema } from "../schema"
import {signIn} from "@/lib/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

import { getUserByEmail, getUserById } from "../data/user"
import { 
generateVerificationToken , generateTwofactorToken
} from "@/lib/token"

import {
sendVerificationEmail, 
sendTwoFactorEmail} from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "../data/two-factor-token"
import { db } from "@/lib/db"
import { get } from "http"
import { getTwoFactorConfirmationByUserId } from "../data/two-factor-confirmation"

type Data = z.infer<typeof LoginSchema>
export const login = async(values : Data) =>{
    console.log(values)
    const validatedField = LoginSchema.safeParse(values)
    if(!validatedField.success){
        return {error:"invalid field"};
    }
   const {email ,password ,code} = validatedField.data

   const existigUser = await getUserByEmail(email);

   if (!existigUser || !existigUser.email || !existigUser.password) {
    return {error :"Email does not exist"}
   }

   if(!existigUser.emailVerified){

    const  verificationToken = await generateVerificationToken(existigUser.email);

    await sendVerificationEmail(verificationToken.email , verificationToken.token)
    return {success : "Confirmation email send"}
    
   }

   if(existigUser.isTwoFactorEnabled && existigUser.email){
    if(code){
      // verify the code
      const twoFactorToken = await getTwoFactorTokenByEmail(existigUser.email)

      if(!twoFactorToken){
        return {error : "Invalid Code"}
      }
      if(twoFactorToken.token !== code){
        return {error : "Invalid Code"}
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if(hasExpired){
        return {error : "Code Expired"}
      }
      await db.twoFactorToken.delete({
        where :{id : twoFactorToken.id}
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existigUser.id)
      
      if(existingConfirmation){
        await db.twoFactorConfirmation.delete({
            where : {id : existingConfirmation.id}
        })
      }

      await db.twoFactorConfirmation.create({
        data:{
            userId :existigUser.id,
        }
      })

    }else{
        const twoFactorToken = await generateTwofactorToken(existigUser.email);

     await sendTwoFactorEmail(
        twoFactorToken.email,
        twoFactorToken.token
     );
     return {twofactor :true};
    }
    
   }
   
   try {
    await signIn("credentials" , {
        email,
        password,
        redirectTo : DEFAULT_LOGIN_REDIRECT,
    })
   } catch (error) {
    if(error instanceof AuthError){
        switch(error.type){
          case "CredentialsSignin":
            return {error : "Invalid credential"}
           default:
            return {error : "Something went wrong"} 
        }
    }
    throw error
   }

 }