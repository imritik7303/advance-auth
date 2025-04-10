"use server"
import * as z from "zod"
import bcyrpt from "bcrypt"
import { RegisterSchema } from "../schema"
import { db } from "@/lib/db"
import {generateVerificationToken} from "@/lib/token"
import { getUserByEmail } from "../data/user"
import { sendVerificationEmail } from "@/lib/mail"

type Data = z.infer<typeof RegisterSchema>

export const register  = async(values : Data) =>{
    
    console.log(values)
    const validatedField = RegisterSchema.safeParse(values)
    if(!validatedField.success){
        return {error:"invalid field"};
    }

    const {name , email ,password} = validatedField.data;
    const hashedPassword = await bcyrpt.hash(password ,10)

    const existingUser = await getUserByEmail(email )
    if (existingUser) {
        return {error : "Email already in use"}
    }
    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword , 
        }
    });
   const verficationToken = await generateVerificationToken(email)
    //send a verification token email
    await sendVerificationEmail(verficationToken.email,verficationToken.token)
    return {sucsess : "Confiramation email sent"}

    
}