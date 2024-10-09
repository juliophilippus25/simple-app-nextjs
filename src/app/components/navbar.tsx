import Link from "next/link"
import Image from "next/image";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
    const session = await auth();
    return (
        <nav className="bg-white">
            <div className="max-screen-xl flex items-center justify-between mx-auto p-4">
                <Link href="/">
                    <h1 className="text-3xl font-bold text-teal-500">JP</h1>
                </Link>
                <div className="flex items-center gap-3 justify-between">
                    <ul className="flex justify-center items-center gap-4 mr-5 text-slate-600 font-semibold">
                        <li>
                            <Link href="/" className="hover:text-teal-500">Home</Link>
                        </li>
                        {session && (
                            <>
                                <li>
                                    <Link href="/dashboard" className="hover:text-teal-500">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="/products" className="hover:text-teal-500">Product</Link>
                                </li>
                                {session.user.role === "admin" ? (
                                    <li>
                                        <Link href="/users" className="hover:text-teal-500">Users</Link>
                                    </li>
                                ) : null}
                            </>
                        )}
                    </ul>
                    {session && (
                        <div className="flex gap-3 items-center">
                            <div className="flex flex-col justify-center -space-y-1">
                                <span className="font-semibold text-gray-600 text-right capitalize">
                                    {session.user.name}
                                </span>
                                <span className="font-xs text-gray-400 text-right capitalize">
                                    {session.user.role}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="text-sm border border-teal-500 bg-gray-100 rounded-full"
                            >
                                <Image
                                    src={session.user.image || "/images.jpg"}
                                    alt="avatar"
                                    width={64}
                                    height={64}
                                    className="w-8 h-8 rounded-full"
                                />
                            </button>
                        </div>
                    )}
                    {session ? (
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/login" });
                            }}
                        >
                            <button
                                type="submit"
                                className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Logout
                            </button>
                        </form>
                    ) : (
                        <Link href="/login">
                            <button
                                type="submit"
                                className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar