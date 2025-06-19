
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Mail } from "lucide-react";
import { plantillasCorreo } from "@/data/plantillasCorreoData";
import { PlantillaCorreo } from "@/types/plantillaCorreo";
import { PlantillasList } from "./plantillas/PlantillasList";
import { PlantillaDetails } from "./plantillas/PlantillaDetails";

export default function PlantillasCorreo() {
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<string>("confirmacion");

  const copiarAlPortapapeles = (contenido: string) => {
    navigator.clipboard.writeText(contenido);
    toast.success("Plantilla copiada al portapapeles");
  };

  const enviarPrueba = (plantilla: PlantillaCorreo) => {
    console.log("Enviando prueba de plantilla:", plantilla.titulo);
    toast.info("Correo de prueba enviado", {
      description: `Se ha enviado una prueba de "${plantilla.titulo}" a tu correo`
    });
  };

  const plantillaActual = plantillasCorreo.find(p => p.id === plantillaSeleccionada) || plantillasCorreo[0];

  return (
    <div className="space-y-6 max-w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Plantillas de Correo Electrónico
          </CardTitle>
          <CardDescription>
            Gestiona las plantillas de correo para diferentes estados de solicitudes
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4">
          <PlantillasList
            plantillas={plantillasCorreo}
            plantillaSeleccionada={plantillaSeleccionada}
            onSeleccionar={setPlantillaSeleccionada}
          />
        </div>
        
        <div className="xl:col-span-8">
          <PlantillaDetails
            plantilla={plantillaActual}
            onCopiarAlPortapapeles={copiarAlPortapapeles}
            onEnviarPrueba={enviarPrueba}
          />
        </div>
      </div>
    </div>
  );
}
