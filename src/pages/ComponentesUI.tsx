
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";
import { Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react";

export default function ComponentesUI() {
  const [progress, setProgress] = useState(60);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const showToast = (type: string) => {
    switch (type) {
      case 'success':
        toast.success("¡Operación exitosa!", {
          description: "Todo se ha completado correctamente."
        });
        break;
      case 'error':
        toast.error("Error en la operación", {
          description: "Ha ocurrido un problema inesperado."
        });
        break;
      case 'info':
        toast.info("Información importante", {
          description: "Tienes una nueva notificación."
        });
        break;
      default:
        toast("Notificación básica");
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Componentes UI
        </h1>
        <p className="text-lg text-slate-600">
          Biblioteca de componentes reutilizables para el desarrollo
        </p>
      </div>

      {/* Botones */}
      <Card>
        <CardHeader>
          <CardTitle>Botones</CardTitle>
          <CardDescription>Diferentes variantes y estados de botones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructivo</Button>
            <Button size="sm">Pequeño</Button>
            <Button size="lg">Grande</Button>
            <Button disabled>Deshabilitado</Button>
          </div>
        </CardContent>
      </Card>

      {/* Formularios */}
      <Card>
        <CardHeader>
          <CardTitle>Formularios</CardTitle>
          <CardDescription>Campos de entrada y controles de formulario</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Ingresa tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje</Label>
            <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terminos" 
              checked={checkboxChecked}
              onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
            />
            <Label htmlFor="terminos">Acepto los términos y condiciones</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="notificaciones"
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
            <Label htmlFor="notificaciones">Recibir notificaciones</Label>
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Card Simple</CardTitle>
            <CardDescription>Una tarjeta básica con título y descripción</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Este es el contenido de la tarjeta. Puedes agregar cualquier elemento aquí.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card con Footer</CardTitle>
            <CardDescription>Tarjeta que incluye acciones en el pie</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Contenido de la tarjeta con botones de acción en la parte inferior.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button>Aceptar</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>Tarjeta con métricas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="mt-2" />
              </div>
              <div className="flex justify-between">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                >
                  -10%
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                >
                  +10%
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges y Estados */}
      <Card>
        <CardHeader>
          <CardTitle>Badges y Estados</CardTitle>
          <CardDescription>Etiquetas y indicadores de estado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secundario</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge className="bg-green-500">Éxito</Badge>
            <Badge className="bg-yellow-500">Advertencia</Badge>
            <Badge className="bg-blue-500">Información</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Controles Interactivos */}
      <Card>
        <CardHeader>
          <CardTitle>Controles Interactivos</CardTitle>
          <CardDescription>Sliders y otros controles de entrada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Valor del slider: {sliderValue[0]}</Label>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Estado del switch: {switchChecked ? 'Activado' : 'Desactivado'}</Label>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
              <span className="text-sm text-slate-600">
                {switchChecked ? 'Activado' : 'Desactivado'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones y Alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones y Alertas</CardTitle>
          <CardDescription>Diferentes tipos de notificaciones del sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => showToast('success')}
              className="bg-green-500 hover:bg-green-600"
            >
              Toast Éxito
            </Button>
            <Button 
              onClick={() => showToast('error')}
              variant="destructive"
            >
              Toast Error
            </Button>
            <Button 
              onClick={() => showToast('info')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Toast Info
            </Button>
            <Button 
              onClick={() => showToast('default')}
              variant="outline"
            >
              Toast Básico
            </Button>
          </div>

          <div className="space-y-3">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Información</AlertTitle>
              <AlertDescription>
                Esta es una alerta informativa básica.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Ha ocurrido un error que requiere tu atención.
              </AlertDescription>
            </Alert>

            <Alert className="border-green-500 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Éxito</AlertTitle>
              <AlertDescription>
                La operación se ha completado exitosamente.
              </AlertDescription>
            </Alert>

            <Alert className="border-yellow-500 text-yellow-700">
              <Bell className="h-4 w-4" />
              <AlertTitle>Advertencia</AlertTitle>
              <AlertDescription>
                Ten cuidado con esta acción, puede tener consecuencias.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Listas */}
      <Card>
        <CardHeader>
          <CardTitle>Listas</CardTitle>
          <CardDescription>Diferentes formatos de listas y elementos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Lista Simple</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Elemento completado
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Otro elemento terminado
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  Elemento pendiente
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Lista con Badges</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Tarea importante</span>
                  <Badge variant="destructive">Alta</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Reunión semanal</span>
                  <Badge className="bg-yellow-500">Media</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Revisión de código</span>
                  <Badge variant="secondary">Baja</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grilla de Componentes */}
      <Card>
        <CardHeader>
          <CardTitle>Grilla de Componentes</CardTitle>
          <CardDescription>Disposición en cuadrícula de elementos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div 
                key={i}
                className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors"
              >
                <span className="text-slate-600 font-medium">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
