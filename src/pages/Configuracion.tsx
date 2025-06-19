
import { useState } from "react";
import { Users, Settings, Bell, Shield, Database, Mail, Key, Globe, Palette, FileText } from "lucide-react";
import { ConfigSidebar } from "@/components/config/ConfigSidebar";
import { ConfigContent } from "@/components/config/ConfigContent";
import { UserManagement } from "@/components/config/UserManagement";
import { SystemSettings } from "@/components/config/SystemSettings";
import { NotificationSettings } from "@/components/config/NotificationSettings";
import { SecuritySettings } from "@/components/config/SecuritySettings";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// Definimos todas las secciones de configuración
const configSections = [
  {
    id: "users",
    label: "Usuarios",
    icon: Users,
    description: "Gestión de usuarios y permisos",
    component: UserManagement
  },
  {
    id: "system",
    label: "Sistema",
    icon: Settings,
    description: "Configuraciones generales del sistema",
    component: SystemSettings
  },
  {
    id: "notifications",
    label: "Notificaciones",
    icon: Bell,
    description: "Configuración de alertas y notificaciones",
    component: NotificationSettings
  },
  {
    id: "security",
    label: "Seguridad",
    icon: Shield,
    description: "Configuraciones de seguridad y acceso",
    component: SecuritySettings
  },
  // Ejemplos adicionales para mostrar escalabilidad
  {
    id: "database",
    label: "Base de Datos",
    icon: Database,
    description: "Configuración de conexiones y respaldos",
    component: SystemSettings // Usando componente existente como ejemplo
  },
  {
    id: "email",
    label: "Correo Electrónico",
    icon: Mail,
    description: "Configuración de servidores SMTP y plantillas",
    component: NotificationSettings // Usando componente existente como ejemplo
  },
  {
    id: "api",
    label: "API y Claves",
    icon: Key,
    description: "Gestión de claves API y webhooks",
    component: SecuritySettings // Usando componente existente como ejemplo
  },
  {
    id: "integrations",
    label: "Integraciones",
    icon: Globe,
    description: "Conexiones con servicios externos",
    component: SystemSettings // Usando componente existente como ejemplo
  },
  {
    id: "appearance",
    label: "Apariencia",
    icon: Palette,
    description: "Personalización de tema y branding",
    component: SystemSettings // Usando componente existente como ejemplo
  },
  {
    id: "reports",
    label: "Reportes",
    icon: FileText,
    description: "Configuración de reportes automáticos",
    component: NotificationSettings // Usando componente existente como ejemplo
  }
];

// Organizamos las secciones en categorías
const configCategories = [
  {
    id: "general",
    label: "General",
    sections: [
      configSections.find(s => s.id === "system")!,
      configSections.find(s => s.id === "appearance")!,
      configSections.find(s => s.id === "notifications")!
    ]
  },
  {
    id: "users-security",
    label: "Usuarios y Seguridad",
    sections: [
      configSections.find(s => s.id === "users")!,
      configSections.find(s => s.id === "security")!,
      configSections.find(s => s.id === "api")!
    ]
  },
  {
    id: "data-integrations",
    label: "Datos e Integraciones",
    sections: [
      configSections.find(s => s.id === "database")!,
      configSections.find(s => s.id === "integrations")!,
      configSections.find(s => s.id === "email")!
    ]
  },
  {
    id: "reporting",
    label: "Reportes y Análisis",
    sections: [
      configSections.find(s => s.id === "reports")!
    ]
  }
];

export default function Configuracion() {
  const [activeSection, setActiveSection] = useState("users");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <ConfigSidebar
        categories={configCategories}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header con toggle para sidebar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Panel de Configuración</h1>
              <p className="text-sm text-gray-600">
                Administra todos los aspectos de tu sistema
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <ConfigContent
          activeSection={activeSection}
          sections={configSections}
        />
      </div>
    </div>
  );
}
