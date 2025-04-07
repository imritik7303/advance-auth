"use client"
import * as z from "zod"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { LoginSchema } from "../../../schema" 
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

import { login } from "../../../action/login"
import { useState, useTransition } from "react"

export const  LoginForm = () =>{

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "email already in use with differnt provider": ""


    const [ ispending , startTransition] = useTransition()
    const [error , SetError] = useState<string | undefined>("");
    const [success , SetSucess] = useState<string |undefined>("");


    type FormData = z.infer<typeof LoginSchema> 
    const form = useForm<FormData>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email: "",
            password : ""
        }
    })


    const onSubmit = (values : FormData) =>{
    startTransition(()=>{
        login(values).then((data)=>{
            SetError(data?.error);
            //add success when we add 2FA

        })
    })

     
    }
    return (
        <CardWrapper
        headerLabel="welcome back"
        backButtonLabel="Dont have an account?"
        backButtonHref="/auth/register" 
        showSocial    
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
               <FormField
               control={form.control}
               name="password"
               render={({field}) =>(
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="*******"
                        type="password"
                        disabled={ispending}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                 )}
               />
            </div>
            <FormError message={error || urlError}/>
            <FormSuccess message={success} />
            <Button type="submit"
            className="w-full"
            disabled={ispending}
            >
           Log In  
            </Button>

          </form>
        </Form>
        </CardWrapper>
    )
}