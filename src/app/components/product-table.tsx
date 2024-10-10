import { getProductsByUser } from '@/app/lib/data';
import { formatDate, formatIDR } from '@/app/lib/utils';

const ProductTable = async () => {
    const products = await getProductsByUser();
    if (!products?.length) return <h1 className='text-2xl'>No products found.</h1>;

    return (
        <table className='w-full mt-3 bg-white'>
            <thead className='border-b border-teal-500'>
                <tr>
                    <th className='py-3 px-6 text-left text-sm'>Name</th>
                    <th className='py-3 px-6 text-left text-sm'>Category</th>
                    <th className='py-3 px-6 text-left text-sm'>Price</th>
                    <th className='py-3 px-6 text-left text-sm'>Created At</th>
                    <th className='py-3 px-6 text-left text-sm'>Created By</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td className='py-3 px-6'>{product.name}</td>
                        <td className='py-3 px-6'>{product.category.name}</td>
                        <td className='py-3 px-6'>{formatIDR(product.price)}</td>
                        <td className='py-3 px-6'>{formatDate(product.createdAt.toString())}</td>
                        <td className='py-3 px-6'>{product.user.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
