
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserManagement } from "./UserManagement";
import { SystemSettings } from "./SystemSettings";
import { NotificationSettings } from "./NotificationSettings";
import { SecuritySettings } from "./SecuritySettings";

interface ConfigSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  component: React.ComponentType;
}

interface ConfigContentProps {
  activeSection: string;
  sections: ConfigSection[];
}

export function ConfigContent({ activeSection, sections }: ConfigContentProps) {
  const currentSection = sections.find(section => section.id === activeSection);
  
  if (!currentSection) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium">Selecciona una opción de configuración</p>
          <p className="text-sm text-gray-400 mt-1">Usa el menú lateral para navegar</p>
        </div>
      </div>
    );
  }

  const { component: Component, label, description, icon: Icon } = currentSection;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header de la sección */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{label}</h1>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </div>

      {/* Contenido de la sección */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className="w-5 h-5 text-blue-600" />
            {label}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Component />
        </CardContent>
      </Card>
    </div>
  );
}
