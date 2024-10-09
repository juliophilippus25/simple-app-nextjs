import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Learn Next JS</h1>
        <p className="text-zinc-500 text-sm">By Julio Philippus</p>
        <p className="text-sm text-gray-600 mt-5">
          Please <Link href="/register" className="text-teal-500 underline">register</Link> first to continue.
        </p>
      </div>
    </div>
  );
}
