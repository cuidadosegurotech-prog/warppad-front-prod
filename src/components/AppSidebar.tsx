import { Calendar, FileText, LayoutDashboard, Plus, Settings } from "lucide-react";
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
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-blue-400/30 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <SidebarHeader className="border-b border-blue-400/30 bg-gradient-to-r from-blue-800 to-indigo-800">
        <div className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
            <img 
              src="https://branzontech.com/wp-content/uploads/2025/06/ChatGPT-Image-18-jun-2025-10_17_52.webp" 
              alt="Hub Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-yellow-200 to-cyan-200 bg-clip-text text-transparent">
              Hub
            </h2>
            <p className="text-sm text-blue-200">
              Plataforma de automatizaciones
            </p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-200/80 px-4 py-2">
            Menú Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className="mx-2 rounded-lg hover:bg-blue-800/50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-yellow-500/30 data-[active=true]:to-amber-500/30 data-[active=true]:border data-[active=true]:border-yellow-400/50"
                  >
                    <Link to={item.url} className="flex items-center gap-3 text-blue-100 hover:text-yellow-200 data-[active=true]:text-blue-900 data-[active=true]:font-semibold">
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
