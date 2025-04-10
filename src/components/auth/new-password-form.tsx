"use client"
import * as z from "zod"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { NewPasswordSchema } from "../../../schema" 
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-sucess"

 
import { useState, useTransition } from "react"
import Link from "next/link"
import {  newPassword} from "../../../action/new-password"
import { useSearchParams } from "next/navigation"

export const  NewPassordForm = () =>{

  const searchParams = useSearchParams();
  const token = searchParams.get("token");


    const [ ispending , startTransition] = useTransition()
    const [error , SetError] = useState<string | undefined>("");
    const [success , SetSucess] = useState<string |undefined>("");


    type FormData = z.infer<typeof NewPasswordSchema> 
    const form = useForm<FormData>({
        resolver : zodResolver(NewPasswordSchema),
        defaultValues : {
            password: "",    
        }
    })


    const onSubmit = (values : FormData ) =>{
    startTransition(()=>{
        SetSucess("")
        SetError("")
        newPassword(values,token).
        then((data) =>{
          SetSucess(data?.success)
          SetError(data?.error)
        })

        
    })

     
    }
    return (
        <CardWrapper
        headerLabel="Enter a new password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login" 
           
           >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
               <FormField
               control={form.control}
               name="password"
               render={({field}) =>(
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="******"
                        type="password"
                        disabled={ispending}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                 )}
               />
               
            </div>
            <FormError message={error}/>
            <FormSuccess message={success} />
            <Button type="submit"
            className="w-full"
            disabled={ispending}
            >
            Reset Password 
            </Button>

          </form>
        </Form>
        </CardWrapper>
    )
}