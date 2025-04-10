"use client"
import * as z from "zod"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ResetSchema } from "../../../schema" 
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
import { reset } from "../../../action/reset"

export const  ResetForm = () =>{

  

    const [ ispending , startTransition] = useTransition()
    const [error , SetError] = useState<string | undefined>("");
    const [success , SetSucess] = useState<string |undefined>("");


    type FormData = z.infer<typeof ResetSchema> 
    const form = useForm<FormData>({
        resolver : zodResolver(ResetSchema),
        defaultValues : {
            email: "",    
        }
    })


    const onSubmit = (values : FormData) =>{
    startTransition(()=>{
        SetSucess("")
        SetError("")
        reset(values).
        then((data) =>{
          SetSucess(data?.success)
          SetError(data?.error)
        })

        
    })

     
    }
    return (
        <CardWrapper
        headerLabel="Forgot your password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login" 
           
           >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
               <FormField
               control={form.control}
               name="email"
               render={({field}) =>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="Adarshyadav@gamil.com"
                        type="email"
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
            Send reset email
            </Button>

          </form>
        </Form>
        </CardWrapper>
    )
}