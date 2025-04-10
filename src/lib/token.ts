import {v4 as uuidv4} from "uuid"
import crypto from "crypto"
import { getVerificationTokenByEmail } from "../../data/verification-token"
import { db } from "./db"
import { getPasswordResetTokenByEmail   } from "../../data/password-reset-token"
import { getTwoFactorTokenByEmail } from "../../data/two-factor-token"

export const  generateTwofactorToken = async(email :string)=>{
  const token = crypto.randomInt(100_000 ,1_000_000).toString()

  const  expires = new Date (new Date().getTime()+3600*1000)

  const existingToken = await getTwoFactorTokenByEmail(email)

  if(existingToken){
    await db.twoFactorToken.delete({
        where:{
            id : existingToken.id
        }
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data:{
        email,
        token,
        expires
    }
  })
  return twoFactorToken
}

export const geneartePasswordResetToken = async (email :string) =>{
    const token = uuidv4()
    const  expires = new Date (new Date().getTime()+3600*1000)

    const existingtoken = await getPasswordResetTokenByEmail(email);

    if(existingtoken){
       await db.passwordResetToken.delete({
        where:{id:existingtoken.id}
       })
    }

    const passwordResetToken = await db.passwordResetToken.create({
      data :{
        email,
        token,
        expires
      }
    })

    return passwordResetToken 
}

export const generateVerificationToken =async(email :string) =>{
    const token = uuidv4()
    const  expires = new Date (new Date().getTime()+3600*1000)
    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await db.verficationToken.delete({
            where :{
                id :existingToken.id
            }
        })
    }

    const verficationToken = await db.verficationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verficationToken
}

 