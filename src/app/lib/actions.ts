"use server"
import { RegisterSchema } from "@/app/lib/zod"
import { hashSync } from "bcrypt-ts"
import { prisma } from "@/app/lib/prisma"
import { redirect } from "next/navigation"

export const signUpCredentials = async (prevstate:unknown, formData: FormData) => {
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
