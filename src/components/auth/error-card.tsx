
import { CardWrapper } from "./card-wrapper";
import { AlertTriangle } from "lucide-react";
 
 export const ErrorCard =  () =>{
    return ( 
        <CardWrapper
        headerLabel="Opps! something went wrong"
        backButtonHref="/auth/login"
        backButtonLabel="back to login"
        >
            <div className="w-full flex justify-center items-center">
                <AlertTriangle className="text-destructive"/>
            </div>

        </CardWrapper>
    )
 }