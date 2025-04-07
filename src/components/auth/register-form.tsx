"use client"
import * as z from "zod"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "../../../schema" 
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

import { register } from "../../../action/register"
import { useState, useTransition } from "react"

export const  RegisterForm = () =>{
    const [ ispending , startTransition] = useTransition()
    const [error , SetError] = useState<string | undefined>("");
    const [success , SetSucess] = useState<string |undefined>("");

    type FormData = z.infer<typeof RegisterSchema> 
    const form = useForm<FormData>({
        resolver : zodResolver(RegisterSchema),
        defaultValues : {
            email: "",
            password : "",
            name : "", 
        }
    })

    const onSubmit = (values : FormData) =>{
    startTransition(()=>{
        register(values).then((data)=>{
            SetError(data.error);
            SetSucess(data.sucsess);

        })
    })
     
    }
    return (
        <CardWrapper
        headerLabel="create a account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login" 
        showSocial    
           >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
            <FormField
               control={form.control}
               name="name"
               render={({field}) =>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="sovit singh"
                        disabled={ispending}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                 )}
               />
               <FormField
               control={form.control}
               name="email"
               render={({field}) =>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="Adarshyadav@gmail.com"
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
            <FormError message={error}/>
            <FormSuccess message={success} />
            <Button type="submit"
            className="w-full"
            disabled={ispending}
            >
            Login
            </Button>

          </form>
        </Form>
        </CardWrapper>
    )
}