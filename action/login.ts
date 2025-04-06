"use server"
import * as z from "zod"

import { LoginSchema } from "../schema"

type Data = z.infer<typeof LoginSchema>
export const login = async(values : Data) =>{
    console.log(values)
    const validatedField = LoginSchema.safeParse(values)
    if(!validatedField.success){
        return {error:"invalid field"};
    }
    return {sucsess : "email sent"}
}