import { Archive, Code, Home, Inbox, Tag, User, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

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
        title: "Usuário",
        url: "/user",
        icon: User,
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
      }
    ]
  },
];

export default function SidebarMenu({ sidebarOpen, toggleSidebar }: SidebarMenuProps) {
  const location = useLocation();

  return (
    <>
      {/* fundo transparente */}
      <div data-show={`${sidebarOpen ? 'open' : 'close'}`} className="data-[show=close]:hidden data-[show=open]:fixed lg:hidden z-50 top-0 bottom-0 right-0 left-0 bg-[#0f172a62] backdrop-blur-md duration-500 transition-all cursor-close opacity-1 pointer-events-auto" onClick={toggleSidebar}></div>

      {/* Menu lateral (sidebar) */}
      <aside data-show={`${sidebarOpen ? 'open' : 'close'}`} className="hidden lg:block data-[show=close]:hidden lg:data-[show=close]:block z-50 data-[show=open]:block data-[show=open]:top-0 lg:data-[show=open]:top-auto fixed h-full bg-sidebar w-64 p-4 pt-8 bg-[#012751]">
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
                      to={item.url}
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
