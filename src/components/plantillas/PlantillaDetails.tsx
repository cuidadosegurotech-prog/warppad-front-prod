
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Send } from "lucide-react";
import { PlantillaCorreo } from "@/types/plantillaCorreo";
import { getIconByType, getBadgeColor } from "@/utils/plantillaUtils";

interface PlantillaDetailsProps {
  plantilla: PlantillaCorreo;
  onCopiarAlPortapapeles: (contenido: string) => void;
  onEnviarPrueba: (plantilla: PlantillaCorreo) => void;
}

export function PlantillaDetails({ plantilla, onCopiarAlPortapapeles, onEnviarPrueba }: PlantillaDetailsProps) {
  const IconComponent = getIconByType(plantilla.tipo);

  return (
    <div className="flex-1 min-w-0">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <IconComponent className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl mb-2 break-words">{plantilla.titulo}</CardTitle>
                <CardDescription className="text-sm break-words">
                  <span className="font-medium">Asunto:</span> {plantilla.asunto}
                </CardDescription>
              </div>
            </div>
            <Badge className={`${getBadgeColor(plantilla.tipo)} flex-shrink-0`}>
              {plantilla.tipo}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview" className="text-xs sm:text-sm">Vista Previa</TabsTrigger>
              <TabsTrigger value="html" className="text-xs sm:text-sm">Código HTML</TabsTrigger>
              <TabsTrigger value="variables" className="text-xs sm:text-sm">Variables</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              <div className="border rounded-lg bg-white overflow-hidden">
                <div className="max-h-96 overflow-y-auto p-4">
                  <div dangerouslySetInnerHTML={{ __html: plantilla.contenido }} />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => onCopiarAlPortapapeles(plantilla.contenido)}
                  variant="outline"
                  className="flex items-center gap-2 justify-center"
                  size="sm"
                >
                  <Copy className="w-4 h-4" />
                  Copiar HTML
                </Button>
                <Button
                  onClick={() => onEnviarPrueba(plantilla)}
                  className="flex items-center gap-2 justify-center"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                  Enviar Prueba
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="html" className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-xs whitespace-pre-wrap break-words">
                  <code>{plantilla.contenido}</code>
                </pre>
              </div>
              
              <Button
                onClick={() => onCopiarAlPortapapeles(plantilla.contenido)}
                variant="outline"
                className="flex items-center gap-2"
                size="sm"
              >
                <Copy className="w-4 h-4" />
                Copiar Código
              </Button>
            </TabsContent>

            <TabsContent value="variables" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4">Variables disponibles en esta plantilla:</h3>
                <div className="grid grid-cols-1 gap-3">
                  {plantilla.variables.map((variable) => (
                    <div
                      key={variable}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border gap-2"
                    >
                      <code className="text-sm font-mono text-blue-600 break-all flex-1">
                        {`{${variable}}`}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onCopiarAlPortapapeles(`{${variable}}`)}
                        className="flex-shrink-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Cómo usar las variables:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Las variables se reemplazan automáticamente al enviar el correo</li>
                  <li>• Usa el formato <code className="bg-blue-100 px-1 rounded">{`{NOMBRE_VARIABLE}`}</code> en el contenido</li>
                  <li>• Las variables distinguen entre mayúsculas y minúsculas</li>
                  <li>• Si una variable no está definida, se mostrará vacía</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
