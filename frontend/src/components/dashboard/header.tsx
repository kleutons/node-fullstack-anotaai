import { Menu, User } from "lucide-react";
import LogoSVG from "../../assets/svg/logo";
import { Link } from "react-router";

interface HeaderProps {
    toggleSidebar: () => void;
  }

export default function Header({toggleSidebar}:HeaderProps){
    return(
        <header className="sticky top-0 w-full backdrop-blur bg-white/70 z-50 ">
        <div className='flex justify-between items-center py-4 lg:px-8 mx-4 lg:mx-0 border-b border-slate-900/10'>
            <Link to={'/'} >
                <LogoSVG />
            </Link>

          <Link
                to={'/profile'}
                className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-md text-white p-2"                
            >
                <User />
          </Link>

          
                    
        </div>  
        <div className='lg:hidden py-4 px-4 border-b border-slate-900/10'>
          <button className='flex gap-3 items-center cursor-pointer' onClick={toggleSidebar}>
            <Menu />
            Menu
          </button>
        </div>
      </header>
    )
}