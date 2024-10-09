import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/lib/prisma"
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
        password: {},
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
          throw new Error("No user found.")
        }

        const isCorrectPassword = compareSync(password, user.password)

        if(!isCorrectPassword) return null;

        return user;
      },
    }),
  ],
  // callback
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const ProtectedRoutes = ["/dashboard", "/user", "/product"];

      if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },

    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
});