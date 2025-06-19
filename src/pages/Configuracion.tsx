
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, Mail, Shield, Database, Bell } from "lucide-react";
import { UserManagement } from "@/components/config/UserManagement";
import { SystemSettings } from "@/components/config/SystemSettings";
import { NotificationSettings } from "@/components/config/NotificationSettings";
import { SecuritySettings } from "@/components/config/SecuritySettings";

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
  }
];

export default function Configuracion() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
          <p className="text-gray-600 mt-1">
            Administra todos los aspectos de tu sistema desde aquí
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1">
          {configSections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <section.icon className="w-5 h-5" />
              <div className="text-center">
                <div className="font-medium">{section.label}</div>
                <div className="text-xs text-gray-500 hidden lg:block">
                  {section.description}
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {configSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <section.component />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
