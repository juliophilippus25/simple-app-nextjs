import FormLogin from "@/app/components/auth/form-login";

export default function Login() {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-teal-500 text-center">Login to your account</h1>
            <FormLogin />
        </div>
    )
}
