
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
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Selecciona una opción de configuración</p>
        </div>
      </div>
    );
  }

  const { component: Component, label, description, icon: Icon } = currentSection;

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Icon className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">{label}</h1>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="w-5 h-5" />
              {label}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Component />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
