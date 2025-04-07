import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
// Notice this is only an object, not a full Auth.js instance
import bcrypt from "bcryptjs"
import { LoginSchema } from "../../schema"
import { getUserByEmail } from "../../data/user"
export default {
  providers: [
    Github({
      clientId :process.env.GITHUB_CLIENT_ID,
      clientSecret :process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId :process.env.GOOGLE_CLIENT_ID,
      clientSecret :process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
        async authorize(credentials){
         const validatedField = LoginSchema.safeParse(credentials);
         if(validatedField.success){
            const {email,password} = validatedField.data

            const user = await getUserByEmail(email);
            if(!user || !user.password) return null;

            const passwordMatched = await bcrypt.compare(password , user.password)

            if(!passwordMatched) return null;

            return user
            
         }
         return null
        }
    })
  ],
} satisfies NextAuthConfig