
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlantillaCorreo } from "@/types/plantillaCorreo";
import { getIconByType, getBadgeColor } from "@/utils/plantillaUtils";

interface PlantillasListProps {
  plantillas: PlantillaCorreo[];
  plantillaSeleccionada: string;
  onSeleccionar: (id: string) => void;
}

export function PlantillasList({ plantillas, plantillaSeleccionada, onSeleccionar }: PlantillasListProps) {
  return (
    <div className="lg:w-80 w-full flex-shrink-0">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-lg">Plantillas Disponibles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {plantillas.map((plantilla) => {
            const IconComponent = getIconByType(plantilla.tipo);
            return (
              <div
                key={plantilla.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  plantillaSeleccionada === plantilla.id
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => onSeleccionar(plantilla.id)}
              >
                <div className="flex items-start gap-3">
                  <IconComponent className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight mb-2 truncate">{plantilla.titulo}</p>
                    <Badge className={`text-xs ${getBadgeColor(plantilla.tipo)}`}>
                      {plantilla.tipo}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
