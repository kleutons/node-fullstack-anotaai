import { Outlet } from "react-router";

export default function DashboardLayout(){

    return(
        <div className='flex flex-col min-h-screen min-w-full'>


            <div className="flex flex-1">
                <div className='lg:pl-64 flex flex-col flex-1 bg-slate-100'>

                    <main className="flex-1 p-4 pt-10 md:p-10">
                        <Outlet />
                    </main>

                </div>
            </div>
            
        </div>
    )
}