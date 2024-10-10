import React from 'react'
import CategoryTable from '@/app/components/category-table'

export default function UsersPage() {
    return (
        <div className='min-h-screen'>
            <div className='max-w-screen-md mx-auto py-10'>
                <h1 className='text-2xl font-bold'>Category List</h1>
                <CategoryTable />
            </div>
        </div>
    )
}
