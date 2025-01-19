import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/dashboard/header";
import SidebarMenu from "../components/dashboard/SidebarMenu";
import Footer from "../components/dashboard/Footer";

export default function DashboardLayout(){
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => { setSidebarOpen(!sidebarOpen)};

    return(
        <div className='flex flex-col min-h-screen min-w-full'>

            <Header toggleSidebar={toggleSidebar} />

            <div className="flex flex-1">

                <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className='lg:pl-64 flex flex-col flex-1 bg-slate-100'>

                    <main className="flex-1 p-4 pt-10 md:p-10">
                        <Outlet />
                    </main>

                    <Footer />
                </div>
            </div>

        </div>
    )
}