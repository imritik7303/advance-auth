import { db } from "@/lib/db";

export const  getTwoFactorTokenByToken = async(token :string)=>{
 try {
    const twoFatcorToken = await db.twoFactorToken.findUnique({
        where :{token}
    })

    return twoFatcorToken;
 } catch (error) {
    return null;
 }
}

export const  getTwoFactorTokenByEmail = async(email :string)=>{
    try {
       const twoFatcorToken = await db.twoFactorToken.findFirst({
           where :{email    }
       })
   
       return twoFatcorToken;
    } catch (error) {
       return null;
    }
   }