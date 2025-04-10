"use server"

import { ResetSchema } from "../schema"
import { getUserByEmail } from "../data/user"
import * as z from "zod";
import { geneartePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

type FormData = z.infer<typeof ResetSchema>

export const reset = async(values : FormData) =>{
  const validatedField  = ResetSchema.safeParse(values);

  if(!validatedField.success){
    return { error : "Invalid Email"}
  }

  const {email} = validatedField.data;

  const exisitngUser = await getUserByEmail(email);

  if(!exisitngUser) {
    return {error : "Email not found"}  
  }
 
  const passwordResetToken = await geneartePasswordResetToken(email)
  await sendPasswordResetEmail(passwordResetToken.email , passwordResetToken.token)
   return {
    success : "Reset email sent!"
   }

 }
