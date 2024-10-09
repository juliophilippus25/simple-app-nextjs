import React from 'react'
import UserTable from '@/app/components/user-table'

export default function UsersPage() {
    return (
        <div className='min-h-screen'>
            <div className='max-w-screen-md mx-auto py-10'>
                <h1 className='text-2xl font-bold'>User List</h1>
                <UserTable />
            </div>
        </div>
    )
}
