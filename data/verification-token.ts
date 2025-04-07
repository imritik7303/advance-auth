import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email :string)=>{
    try {
       const verificationToken = await db.verficationToken.findFirst({
        where : {email}
       })
    } catch (error) {
        return null;
    }
}