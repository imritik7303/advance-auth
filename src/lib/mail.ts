import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorEmail = async(
email :string,
token:string)=>{
  
   await resend.emails.send({
    from :"onboarding@resend.dev",
        to :email,
        subject:"two factor authentication",
        html:`<p>Your 2FA Code :${token}</p>`
   })
}

export const sendPasswordResetEmail = async(
 email :string,
 token:string   
) =>{

    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from :"onboarding@resend.dev",
        to :email,
        subject:"Reset your password",
        html:`<p>click<a href="${resetLink}">here</a>reset your pasword</p>`
    })

}
export const sendVerificationEmail = async (email :string , token:string) =>{

    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`
    
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Comfirm your email" ,
        html:`<p>click<a href="${confirmationLink}">here</a>to confirm email</p>`
    })
}