import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from "@/app/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/app/lib/zod"
import { compareSync } from "bcrypt-ts"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials:{
        email: {},
        passowrd: {},
      },
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);

        if(!validateFields.success) {
          return null
        }

        const {email,password} = validateFields.data;

        const user = await prisma.user.findUnique({
          where: {email }
        })

        if(!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isCorrectPassword = compareSync(password, user.password)

        if(!isCorrectPassword) return null;

        return user;
      }
    })
  ],
})