"use server"
import * as z from "zod"

import { RegisterSchema } from "../schema"

type Data = z.infer<typeof RegisterSchema>
export const register  = async(values : Data) =>{
    console.log(values)
    const validatedField = RegisterSchema.safeParse(values)
    if(!validatedField.success){
        return {error:"invalid field"};
    }
    return {sucsess : "email sent"}
}