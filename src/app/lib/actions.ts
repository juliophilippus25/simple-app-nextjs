"use server"
import { RegisterSchema, LoginSchema } from "@/app/lib/zod"
import { hashSync } from "bcrypt-ts"
import { prisma } from "@/app/lib/prisma"
import { redirect } from "next/navigation"
import { signIn } from "@/app/auth"
import { AuthError } from "next-auth"

// Register
export const registerCredentials = async (prevstate:unknown, formData: FormData) => {
    const validateFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors
        }
    }

    const {name, email, password} = validateFields.data
    const hashedPassword = hashSync(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    } catch(error) {
        return {message: "Failed to register."};
    }
    redirect("/login")
};

// Login
export const loginCredentials = async (prevstate:unknown, formData: FormData) => {
    const validateFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors
        }
    }

    const {email, password} = validateFields.data

    try {
        await signIn("credentials", {email, password, redirectTo: "/dashboard"})
    } catch(error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {message: "Invalid credentials."}
                default:
                    return {message: "Something went wrong."}
            }
        }
        throw error;
    }
};
