"use client"
import { useFormStatus } from "react-dom"

export const RegisterButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
            {pending ? "Registering..." : "Register"}
        </button>
    );
}