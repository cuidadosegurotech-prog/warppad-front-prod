
import { Calendar, FileText, LayoutDashboard, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Nueva solicitud",
    url: "/nueva-solicitud",
    icon: Plus,
  },
  {
    title: "Consultar solicitudes",
    url: "/consultar-solicitudes",
    icon: FileText,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-blue-400/20">
      <SidebarHeader className="border-b border-blue-400/20 bg-gradient-to-r from-blue-800/20 to-indigo-800/20">
        <div className="flex items-center gap-3 p-4">
          <div className="p-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-xl shadow-lg">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-yellow-200 to-cyan-200 bg-clip-text text-transparent">
              Warp
            </h2>
            <p className="text-sm text-blue-300">
              Hub de automatizaciones
            </p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gradient-to-br from-blue-900/10 via-blue-800/10 to-indigo-900/10">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-200/70 px-4 py-2">
            Menú Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className="mx-2 rounded-lg hover:bg-blue-800/30 data-[active=true]:bg-gradient-to-r data-[active=true]:from-yellow-500/20 data-[active=true]:to-amber-500/20 data-[active=true]:border data-[active=true]:border-yellow-400/30"
                  >
                    <Link to={item.url} className="flex items-center gap-3 text-blue-100 hover:text-yellow-200 data-[active=true]:text-yellow-300">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
