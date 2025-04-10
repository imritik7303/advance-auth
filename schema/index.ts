import * as z from "zod";


export const NewPasswordSchema = z.object({

    password :z.string().min(6 ,{
        message :"minimum 6 character required"
    }),  
});

export const ResetSchema = z.object({

    email :z.string().email({
        message :"email is required"
    }),  
});

export const LoginSchema = z.object({

    email :z.string().email({
        message :"email is required"
    }),
    password : z.string().min(1,{
        message :"password is required"
    }),

    code: z.optional(z.string()),

});

export const RegisterSchema = z.object({

    email :z.string().email({
        message :"email is required"
    }),
    password : z.string().min(6,{
        message :"minimum 6 character"
    }),
    name : z.string().min(1,{
        message:"Name is required"
    }),
    
});


