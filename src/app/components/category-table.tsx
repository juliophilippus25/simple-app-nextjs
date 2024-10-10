import { getCategories } from '@/app/lib/data';

const CategoryTable = async () => {
    const categories = await getCategories();
    if (!categories?.length) return <h1 className='text-2xl'>No categories found.</h1>;

    return (
        <table className='w-full mt-3 bg-white'>
            <thead className='border-b border-teal-500'>
                <tr>
                    <th className='py-3 px-6 text-left text-sm'>Name</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td className='py-3 px-6'>{category.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CategoryTable;
