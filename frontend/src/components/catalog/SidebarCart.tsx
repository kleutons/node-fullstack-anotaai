import { X } from "lucide-react";
import { ReactNode } from "react";

interface SidebarMenuProps {
  title: string,
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  children: ReactNode
}

export default function SidebarCart({ title, sidebarOpen, toggleSidebar, children }: SidebarMenuProps) {
  

  return (
    <>
      {/* fundo transparente */}
      <div data-show={`${sidebarOpen ? 'open' : 'close'}`} className="opacity-0 fixed z-50 top-0 bottom-0 right-0 left-0 bg-slate-900/70 backdrop-blur-sm duration-500 transition-all cursor-close pointer-events-none data-[show=open]:opacity-100 data-[show=open]:pointer-events-auto" onClick={toggleSidebar}></div>

      {/* Menu lateral (sidebar) */}
      <aside data-show={`${sidebarOpen ? 'open' : 'close'}`} className="z-50 fixed top-0 h-full w-5/6 lg:w-1/3 bg-white -right-full opacity-0 pointer-events-none data-[show=open]:opacity-100 data-[show=open]:right-0 data-[show=open]:pointer-events-auto transition-all duration-300 ">
        {/*Btn Close */}
        <button className='absolute top-0 left-0 p-4' onClick={toggleSidebar}>
          <X />
        </button>
        
        <div className="flex flex-col text-center h-full justify-between">
            <h2 className="text-lg font-semibold text-foreground m-6 mt-8 mb-3 border-b border-b-slate-200">
              {title}
            </h2>
          {children}
        </div>
      </aside>
    </>
  );
}
