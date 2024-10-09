import { getUsers } from '@/app/lib/data';

const UserTable = async () => {
    const users = await getUsers();
    if (!users?.length) return <h1 className='text-2xl'>No users found.</h1>;

    return (
        <table className='w-full mt-3 bg-white'>
            <thead className='border-b border-teal-500'>
                <tr>
                    <th className='py-3 px-6 text-left text-sm'>Name</th>
                    <th className='py-3 px-6 text-left text-sm'>Email</th>
                    <th className='py-3 px-6 text-left text-sm'>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className='py-3 px-6'>{user.name}</td>
                        <td className='py-3 px-6'>{user.email}</td>
                        <td className='py-3 px-6'>
                            {user.role === 'admin' ? (
                                <span className='bg-green-400 text-white text-xs font-semibold py-1 px-2 rounded-full'>
                                    Admin
                                </span>
                            ) : (
                                <span className='bg-yellow-400 text-white text-xs font-semibold py-1 px-2 rounded-full'>
                                    User
                                </span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
