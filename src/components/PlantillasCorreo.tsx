
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Mail, Copy, Send, CheckCircle, Clock, FileCheck } from "lucide-react";

interface PlantillaCorreo {
  id: string;
  titulo: string;
  asunto: string;
  contenido: string;
  tipo: "confirmacion" | "proceso" | "completada";
  variables: string[];
}

export default function PlantillasCorreo() {
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<string>("confirmacion");

  const plantillas: PlantillaCorreo[] = [
    {
      id: "confirmacion",
      titulo: "Confirmación de Recepción de Solicitud",
      asunto: "Hemos recibido tu solicitud - Ticket #{NUMERO_TICKET}",
      tipo: "confirmacion",
      variables: ["NOMBRE_CLIENTE", "NUMERO_TICKET", "FECHA_SOLICITUD", "TIPO_SOLICITUD"],
      contenido: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Solicitud</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
        }
        .content { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 0 0 10px 10px; 
        }
        .ticket-info { 
            background: white; 
            padding: 20px; 
            border-left: 4px solid #667eea; 
            margin: 20px 0; 
            border-radius: 5px; 
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #666; 
            font-size: 14px; 
        }
        .btn { 
            display: inline-block; 
            background: #667eea; 
            color: white; 
            padding: 12px 25px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 15px 0; 
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>¡Solicitud Recibida!</h1>
        <p>Hemos recibido tu solicitud exitosamente</p>
    </div>
    
    <div class="content">
        <p>Estimado/a <strong>{NOMBRE_CLIENTE}</strong>,</p>
        
        <p>Te confirmamos que hemos recibido tu solicitud correctamente. Nuestro equipo ya está trabajando en revisar los detalles.</p>
        
        <div class="ticket-info">
            <h3>Detalles de tu solicitud:</h3>
            <ul>
                <li><strong>Número de ticket:</strong> {NUMERO_TICKET}</li>
                <li><strong>Fecha de solicitud:</strong> {FECHA_SOLICITUD}</li>
                <li><strong>Tipo de solicitud:</strong> {TIPO_SOLICITUD}</li>
            </ul>
        </div>
        
        <p>📱 <strong>¿Qué sigue?</strong></p>
        <ul>
            <li>Revisaremos tu solicitud en las próximas 24-48 horas</li>
            <li>Te contactaremos si necesitamos información adicional</li>
            <li>Recibirás actualizaciones por correo electrónico</li>
        </ul>
        
        <p>Si tienes alguna pregunta, no dudes en contactarnos citando tu número de ticket.</p>
        
        <div class="footer">
            <p>Gracias por confiar en nosotros,<br>
            <strong>Equipo de Soporte</strong></p>
            <p><small>Este es un correo automático, por favor no respondas a esta dirección.</small></p>
        </div>
    </div>
</body>
</html>`
    },
    {
      id: "proceso",
      titulo: "Solicitud en Proceso",
      asunto: "Tu solicitud está en proceso - Ticket #{NUMERO_TICKET}",
      tipo: "proceso",
      variables: ["NOMBRE_CLIENTE", "NUMERO_TICKET", "TIEMPO_ESTIMADO", "PROGRESO", "RESPONSABLE"],
      contenido: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud en Proceso</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
        }
        .content { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 0 0 10px 10px; 
        }
        .progress-bar { 
            background: #e0e0e0; 
            height: 20px; 
            border-radius: 10px; 
            overflow: hidden; 
            margin: 15px 0; 
        }
        .progress-fill { 
            background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%); 
            height: 100%; 
            transition: width 0.3s ease; 
        }
        .status-card { 
            background: white; 
            padding: 20px; 
            border-left: 4px solid #f5576c; 
            margin: 20px 0; 
            border-radius: 5px; 
        }
        .timeline { 
            background: white; 
            padding: 20px; 
            border-radius: 5px; 
            margin: 20px 0; 
        }
        .timeline-item { 
            display: flex; 
            align-items: center; 
            margin: 10px 0; 
        }
        .timeline-dot { 
            width: 12px; 
            height: 12px; 
            border-radius: 50%; 
            margin-right: 15px; 
        }
        .completed { background: #28a745; }
        .current { background: #f5576c; }
        .pending { background: #e0e0e0; }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #666; 
            font-size: 14px; 
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 ¡Tu solicitud está en proceso!</h1>
        <p>Estamos trabajando en tu solicitud</p>
    </div>
    
    <div class="content">
        <p>Hola <strong>{NOMBRE_CLIENTE}</strong>,</p>
        
        <p>Te informamos que tu solicitud está siendo procesada activamente por nuestro equipo.</p>
        
        <div class="status-card">
            <h3>Estado actual de tu solicitud</h3>
            <p><strong>Ticket:</strong> {NUMERO_TICKET}</p>
            <p><strong>Progreso:</strong> {PROGRESO}%</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: {PROGRESO}%"></div>
            </div>
            <p><strong>Tiempo estimado de finalización:</strong> {TIEMPO_ESTIMADO}</p>
            <p><strong>Responsable asignado:</strong> {RESPONSABLE}</p>
        </div>
        
        <div class="timeline">
            <h3>📋 Progreso del proyecto</h3>
            <div class="timeline-item">
                <div class="timeline-dot completed"></div>
                <span>✅ Solicitud recibida y validada</span>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot current"></div>
                <span>🔄 En desarrollo/procesamiento</span>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot pending"></div>
                <span>⏳ Revisión y pruebas</span>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot pending"></div>
                <span>🎯 Entrega finalizada</span>
            </div>
        </div>
        
        <p>💡 <strong>Mientras tanto:</strong></p>
        <ul>
            <li>Recibirás actualizaciones regulares sobre el progreso</li>
            <li>Puedes contactarnos si tienes preguntas urgentes</li>
            <li>Te notificaremos inmediatamente cuando esté listo</li>
        </ul>
        
        <div class="footer">
            <p>Gracias por tu paciencia,<br>
            <strong>Equipo de Desarrollo</strong></p>
            <p><small>Actualización automática del sistema de seguimiento.</small></p>
        </div>
    </div>
</body>
</html>`
    },
    {
      id: "completada",
      titulo: "Solicitud Completada",
      asunto: "¡Tu solicitud ha sido completada! - Ticket #{NUMERO_TICKET}",
      tipo: "completada",
      variables: ["NOMBRE_CLIENTE", "NUMERO_TICKET", "FECHA_COMPLETADO", "RESULTADO", "LINK_DESCARGA", "PROXIMOS_PASOS"],
      contenido: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud Completada</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
        }
        .content { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 0 0 10px 10px; 
        }
        .success-card { 
            background: white; 
            padding: 20px; 
            border-left: 4px solid #28a745; 
            margin: 20px 0; 
            border-radius: 5px; 
        }
        .download-section { 
            background: white; 
            padding: 20px; 
            border-radius: 5px; 
            margin: 20px 0; 
            text-align: center; 
        }
        .btn-download { 
            display: inline-block; 
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 15px 0; 
            font-weight: bold; 
        }
        .next-steps { 
            background: white; 
            padding: 20px; 
            border-radius: 5px; 
            margin: 20px 0; 
        }
        .rating-section { 
            background: #fff3cd; 
            padding: 20px; 
            border-radius: 5px; 
            margin: 20px 0; 
            text-align: center; 
        }
        .star-rating { 
            font-size: 24px; 
            margin: 10px 0; 
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #666; 
            font-size: 14px; 
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 ¡Solicitud Completada!</h1>
        <p>Tu proyecto ha sido finalizado exitosamente</p>
    </div>
    
    <div class="content">
        <p>¡Estimado/a <strong>{NOMBRE_CLIENTE}</strong>!</p>
        
        <p>¡Excelentes noticias! 🚀 Tu solicitud ha sido completada exitosamente y está lista para su entrega.</p>
        
        <div class="success-card">
            <h3>✅ Detalles de finalización</h3>
            <ul>
                <li><strong>Ticket:</strong> {NUMERO_TICKET}</li>
                <li><strong>Fecha de completado:</strong> {FECHA_COMPLETADO}</li>
                <li><strong>Resultado:</strong> {RESULTADO}</li>
            </ul>
        </div>
        
        <div class="download-section">
            <h3>📦 Tu proyecto está listo</h3>
            <p>Haz clic en el botón de abajo para acceder a tu proyecto completado:</p>
            <a href="{LINK_DESCARGA}" class="btn-download">
                💾 Descargar / Acceder al Proyecto
            </a>
            <p><small>El enlace estará disponible por 30 días</small></p>
        </div>
        
        <div class="next-steps">
            <h3>🔄 Próximos pasos</h3>
            <div>{PROXIMOS_PASOS}</div>
            <ul>
                <li>Revisa cuidadosamente el resultado entregado</li>
                <li>Prueba todas las funcionalidades incluidas</li>
                <li>Si tienes preguntas, contáctanos dentro de los próximos 7 días</li>
                <li>Considera dejar una reseña sobre nuestro servicio</li>
            </ul>
        </div>
        
        <div class="rating-section">
            <h3>⭐ ¿Cómo fue tu experiencia?</h3>
            <p>Tu opinión es muy importante para nosotros</p>
            <div class="star-rating">⭐⭐⭐⭐⭐</div>
            <p><small>Haz clic en las estrellas para calificar nuestro servicio</small></p>
        </div>
        
        <p><strong>¿Necesitas soporte adicional?</strong></p>
        <p>Ofrecemos soporte post-entrega por 30 días. Si encuentras algún problema o tienes preguntas, no dudes en contactarnos.</p>
        
        <div class="footer">
            <p>¡Gracias por elegir nuestros servicios!<br>
            <strong>Equipo de Desarrollo</strong></p>
            <p><small>¿Te gustó nuestro trabajo? ¡Recomiéndanos a otros!</small></p>
        </div>
    </div>
</body>
</html>`
    }
  ];

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

  const plantillaActual = plantillas.find(p => p.id === plantillaSeleccionada) || plantillas[0];

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case "confirmacion":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "proceso":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "completada":
        return <FileCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "confirmacion":
        return "bg-green-100 text-green-800";
      case "proceso":
        return "bg-orange-100 text-orange-800";
      case "completada":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar con lista de plantillas */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plantillas Disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {plantillas.map((plantilla) => (
                <div
                  key={plantilla.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    plantillaSeleccionada === plantilla.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPlantillaSeleccionada(plantilla.id)}
                >
                  <div className="flex items-start gap-2">
                    {getIconByType(plantilla.tipo)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{plantilla.titulo}</p>
                      <Badge className={`text-xs mt-1 ${getBadgeColor(plantilla.tipo)}`}>
                        {plantilla.tipo}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Área principal con detalles de plantilla */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getIconByType(plantillaActual.tipo)}
                  <div>
                    <CardTitle>{plantillaActual.titulo}</CardTitle>
                    <CardDescription className="mt-1">
                      Asunto: {plantillaActual.asunto}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getBadgeColor(plantillaActual.tipo)}>
                  {plantillaActual.tipo}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Vista Previa</TabsTrigger>
                  <TabsTrigger value="html">Código HTML</TabsTrigger>
                  <TabsTrigger value="variables">Variables</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                  <div className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto">
                    <div dangerouslySetInnerHTML={{ __html: plantillaActual.contenido }} />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copiarAlPortapapeles(plantillaActual.contenido)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copiar HTML
                    </Button>
                    <Button
                      onClick={() => enviarPrueba(plantillaActual)}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Prueba
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="html" className="space-y-4">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{plantillaActual.contenido}</code>
                    </pre>
                  </div>
                  
                  <Button
                    onClick={() => copiarAlPortapapeles(plantillaActual.contenido)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar Código
                  </Button>
                </TabsContent>

                <TabsContent value="variables" className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Variables disponibles en esta plantilla:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {plantillaActual.variables.map((variable) => (
                        <div
                          key={variable}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                        >
                          <code className="text-sm font-mono text-blue-600">
                            {`{${variable}}`}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copiarAlPortapapeles(`{${variable}}`)}
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
                      <li>• Usa el formato <code>{`{NOMBRE_VARIABLE}`}</code> en el contenido</li>
                      <li>• Las variables distinguen entre mayúsculas y minúsculas</li>
                      <li>• Si una variable no está definida, se mostrará vacía</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
