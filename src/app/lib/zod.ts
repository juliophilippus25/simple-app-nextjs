import {object, string} from "zod"

export const LoginSchema = object({
    email: string().email({message: "Invalid email."}),
    password: string().min(8, "Password must be at least 8 characters."),
})

export const RegisterSchema = object({
    name: string().min(1, {message: "Name must be more than 1 character."}),
    email: string().email({message: "Invalid email."}),
    password: string().min(8, "Password must be at least 8 characters."),
    confirmPassword: string().min(8, "Confirm password must be at least 8 characters."),
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})