import { Archive, Code, Home, Inbox, Tag, UsersRound, X, UserRoundCheck, CircleOff } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface SidebarMenuProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const menuList = [
  {
    group: "Aplicação",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Meus Dados",
        url: "/profile",
        icon: UserRoundCheck ,
      },
      {
        title: "Usuários",
        url: "/user-list",
        icon: UsersRound,
      }
    ]
  },
  {
    group: "Catálogo",
    items: [
      {
        title: "Categorias",
        url: "/category",
        icon: Tag,
      },
      {
        title: "Produtos",
        url: "/product",
        icon: Inbox,
      },
      {
        title: "Catálogo Online",
        url: "/catalog",
        icon: Archive
      }
    ]
  },
  {
    group: "Sobre",
    items: [
      {
        title: "Desenvolvedor",
        url: "/dev",
        icon: Code,
      },
      {
        title: "Page 404",
        url: "/404",
        icon: CircleOff,
      }
    ]
  },
];

export default function SidebarMenu({ sidebarOpen, toggleSidebar }: SidebarMenuProps) {
  const {user} = useAuth();
  
  const location = useLocation();

  return (
    <>
      {/* fundo transparente */}
      <div data-show={`${sidebarOpen ? 'open' : 'close'}`} className="opacity-0 fixed lg:hidden z-50 top-0 bottom-0 right-0 left-0 bg-[#0f172a62] backdrop-blur-md duration-500 transition-all cursor-close pointer-events-none data-[show=open]:opacity-100 data-[show=open]:pointer-events-auto" onClick={toggleSidebar}></div>

      {/* Menu lateral (sidebar) */}
      <aside data-show={`${sidebarOpen ? 'open' : 'close'}`} className="z-50 fixed top-0 h-full w-64 p-4 pt-8 bg-[#012751] -left-full opacity-0 pointer-events-none data-[show=open]:opacity-100 data-[show=open]:left-0 data-[show=open]:pointer-events-auto lg:top-auto lg:left-0 lg:opacity-100 lg:pointer-events-auto transition-all duration-300 ">
        {/*Btn Close */}
        <button className='absolute top-0 right-0 p-4 text-white/50 lg:hidden' onClick={toggleSidebar}>
          <X />
        </button>
        <nav className='gap-4 flex flex-col text-sky-200'>
          {menuList.map((group, index) => (
            <div key={index}>
              <h3 className="text-sky-200/65 mb-2">{group.group}</h3>
              <ul>
                {group.items.map((item, idx) => (
                  <li key={idx} className="mb-2">
                    <Link
                      to={!item.title.includes('Catálogo Onlin') ? item.url : user ? item.url + `/${user.storeId}` : item.url + '/pizzaria'}
                      className={`flex items-center space-x-2 rounded-md p-2 transition-all duration-300 ${location.pathname === item.url ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
                      onClick={toggleSidebar}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
