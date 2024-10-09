import { auth } from "@/auth";

const Dashboard = async () => {
    const session = await auth();
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-800">Learn Next JS</h1>
                <h3 className="text-2xl text-slate-500">Welcome, <span className="text-teal-500 font-bold">{session?.user?.name}</span>.</h3>
            </div>
        </div>
    );
};

export default Dashboard;
