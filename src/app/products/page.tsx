import React from 'react'
import ProductTable from '@/app/components/product-table'

export default function ProductsPage() {
    return (
        <div className='min-h-screen'>
            <div className='max-w-screen-md mx-auto py-10'>
                <h1 className='text-2xl font-bold'>Product List</h1>
                <ProductTable />
            </div>
        </div>
    )
}
