"use server"

import { NewPasswordSchema } from "../schema"
import * as z from "zod"
import { getPasswordResetTokenByToken } from "../data/password-reset-token"
import { getUserByEmail } from "../data/user"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

type FormData = z.infer<typeof NewPasswordSchema>

export const newPassword = async(value : FormData , token? :string | null)=>{
 
    if(!token){
        return {error :"Missing token"}
    }   

    const validatedFiled = NewPasswordSchema.safeParse(value);

    if(!validatedFiled.success){
        return {error :"Invalid field"}
    }

    const {password} = validatedFiled.data

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return {error:"Invalid Token"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date() ;

    if(hasExpired) {
        return { error : "Token Expired"}
    }

    const exisitngUser = await getUserByEmail(existingToken.email);

    if(!exisitngUser){
        return {error : "email Does Not Exist"}
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    await db.user.update({
        where:{id :exisitngUser.id},
        data : {password :hashedPassword}
    })
 
    await db.passwordResetToken.delete({
        where :{ id : existingToken.id}
    }) 
 
     return {success : "Password updated"}
}