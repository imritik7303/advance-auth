"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader} from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "../../../action/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-sucess"
export const NewVerificationForm = () =>{

    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    
   // useCallback is used to memoize a function so it doesn’t get re-created on every render.

   //useEffect is used to run a side effect when that function (or something else) changes.
    const [error ,SetError]  = useState<string | undefined> ("")
    const [success ,SetSucess]  = useState<string | undefined> ("")
    const onSubmit = useCallback(() =>{
       
        if(success || error) return 

        if(!token) {
            SetError("Missing Token");
            return
        }
        console.log(token);
        newVerification(token).then((data) =>{
            SetSucess(data.success)
            SetError(data.error)
        }).catch(()=>{
            SetError("something went wrong")
        })
    },[token ,success ,error]) //rerender the onsumbmit function only when token change

    useEffect(()=>{
       
       onSubmit();
    }, [onSubmit])// runs only when the onsubmit change == tokenchange


    return (
        <CardWrapper
  headerLabel="Confirm your verification"
  backButtonLabel="back to login"
  backButtonHref="/auth/login"
  >
    <div className="flex items-center w-full justify-center ">
    {!success && !error && (
        <BeatLoader />
    )}
     
     <FormSuccess message={success}/>
      {!success && (
        <FormError message={error}/>
      )}
     
    </div>


  </CardWrapper>
    )
  
}