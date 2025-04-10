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
import Link from "next/link"

export const  LoginForm = () =>{

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "email already in use with differnt provider": ""


    const [ ispending , startTransition] = useTransition()
    const [error , SetError] = useState<string | undefined>("");
    const [success , SetSucess] = useState<string |undefined>("");
    const [showTwoFactor , SetShowTwoFactor] = useState(false);


    type FormData = z.infer<typeof LoginSchema> 
    const form = useForm<FormData>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email: "",
            password : ""
        }
    })


    const onSubmit = (values : FormData) =>{
     SetSucess("")
     SetError("")
     startTransition(()=>{
        login(values).then((data)=>{
            if(data?.error){
                form.reset();
                SetError(data.error)
            }
            if(data?.success){
                form.reset();
                SetSucess(data.success)
            }

            if(data?.twofactor){
                SetShowTwoFactor(true)
            }
        }).catch(()=>{
            SetError("Something Went Wrong!")
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

                {showTwoFactor && (
                    <FormField
                    control={form.control}
                    name="code"
                    render={({field}) =>(
                     <FormItem>
                         <FormLabel>Two Factor Code</FormLabel>
                         <FormControl>
                             <Input
                             {...field}
                             placeholder="123456"
                             disabled={ispending}
                             />
                         </FormControl>
                         <FormMessage/>
                     </FormItem>
                      )}
                    />
                )}
                 
                {!showTwoFactor && (<>
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
                    <Button size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                    >
                        <Link href="/auth/reset">
                        Forgot password?
                        </Link>
                    </Button>
                    <FormMessage/>
                </FormItem>
                 )}
               />
                </>
            )}
            </div>
            <FormError message={error || urlError}/>
            <FormSuccess message={success} />
            <Button type="submit"
            className="w-full"
            disabled={ispending}
            >
            {showTwoFactor ? "Confirm" : "Login"} 
            </Button>

          </form>
        </Form>
        </CardWrapper>
    )
}