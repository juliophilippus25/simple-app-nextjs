"use client"
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { loginCredentials } from '@/app/lib/actions'
import { LoginButton } from '@/app/components/buttons'

export default function FormLogin() {
    const [state, formAction] = useFormState(loginCredentials, null)
    return (
        <form action={formAction} className='space-y-4'>
            {state?.message ? (
                <div className='p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg' role='alert'>
                    <span className='font-medium'>{state?.message}</span>
                </div>
            ) : null}

            <div>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-slate-600'>Email <span className='text-red-500'>*</span></label>
                <input type="email" name="email" id='email' className="bg-slate-50 border border-slate-400 text-slate-600 text-sm rounded-lg block w-full p-2.5 focus:outline-none" placeholder='Enter your email' />
                <div aria-live='polite' aria-atomic='true'>
                    <span className='text-sm text-red-500 mt-2'>{state?.error?.email}</span>
                </div>
            </div>
            <div>
                <label htmlFor="password" className='block mb-2 text-sm font-medium text-slate-600'>Password <span className='text-red-500'>*</span></label>
                <input type="password" name="password" id='password' className="bg-slate-50 border border-slate-400 text-slate-600 text-sm rounded-lg block w-full p-2.5 focus:outline-none" placeholder='Enter your password' />
                <div aria-live='polite' aria-atomic='true'>
                    <span className='text-sm text-red-500 mt-2'>{state?.error?.password}</span>
                </div>
            </div>
            <LoginButton />
            <p className='text-sm font-light text-gray-500 text-center'>
                Don&apos;t have an account?
                <Link href="/register" className='font-medium text-teal-500 hover:text-teal-600'> Register</Link>
            </p>
        </form>
    )
}
