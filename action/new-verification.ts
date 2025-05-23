"use server" 
 
import { db } from "@/lib/db"
import { getUserByEmail } from "../data/user"

import { getVerificationTokenByToken } from "../data/verification-token"

export const newVerification = async (token :string ) =>{
    const exisitingToken   =  await getVerificationTokenByToken(token);

    if(!exisitingToken){
        return {error : "Token deos not exist"}
    }

    const hasExpired = new Date(exisitingToken.expires) < new Date();
  
    if(hasExpired){
         return {error: "token has expired"}
    }

    const  existingUser = await getUserByEmail(exisitingToken.email) ;

    if(!existingUser){
        return { error : "Email does not exist"}
    }

    await db.user.update({
        where:{id: existingUser.id},
        data:{
            emailVerified: new Date(),
            email :existingUser.email
        }
    });

    await db.verficationToken.delete({
        where:{id : exisitingToken.id}
    });

    return { success :"Email Verified"}


}
 