import FormRegister from "@/app/components/auth/form-register";

export default function Register() {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-blue-500 text-center">Create an account</h1>
            <FormRegister />
        </div>
    )
}
