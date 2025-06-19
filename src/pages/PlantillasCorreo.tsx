
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, Send, Eye, Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function PlantillasCorreo() {
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Plantilla copiada al portapapeles");
  };

  const plantillaConfirmacion = `
Estimado/a [NOMBRE_SOLICITANTE],

Esperamos que este mensaje le encuentre bien.

Por medio de la presente, confirmamos la recepción de su solicitud con los siguientes detalles:

DETALLES DE LA SOLICITUD:
━━━━━━━━━━━━━━━━━━━━━━━━━
• Número de solicitud: [NUMERO_SOLICITUD]
• Fecha de recepción: [FECHA_RECEPCION]
• Tipo de solicitud: [TIPO_SOLICITUD]
• Estado actual: En proceso de revisión

PRÓXIMOS PASOS:
━━━━━━━━━━━━━━━━━━
1. Su solicitud será revisada por nuestro equipo especializado
2. Recibirá una respuesta en un plazo máximo de [TIEMPO_RESPUESTA] días hábiles
3. Cualquier documentación adicional requerida le será comunicada oportunamente

INFORMACIÓN IMPORTANTE:
━━━━━━━━━━━━━━━━━━━━━━━
• Conserve este número de solicitud para futuras consultas: [NUMERO_SOLICITUD]
• Puede consultar el estado de su solicitud en nuestro portal web
• Si requiere información adicional, no dude en contactarnos

DATOS DE CONTACTO:
━━━━━━━━━━━━━━━━━━━━
• Teléfono: [TELEFONO_CONTACTO]
• Email: [EMAIL_CONTACTO]
• Horario de atención: [HORARIO_ATENCION]

Agradecemos su confianza en nuestros servicios y le aseguramos que su solicitud será atendida con la mayor diligencia y profesionalismo.

Atentamente,

[NOMBRE_FUNCIONARIO]
[CARGO]
[NOMBRE_INSTITUCION]
[DIRECCION]
[TELEFONO] | [EMAIL_INSTITUCIONAL]

NOTA: Este es un mensaje automático, por favor no responda a este correo. Para consultas, utilice nuestros canales oficiales de atención.
  `.trim();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Plantillas de Correo
        </h1>
        <p className="text-lg text-slate-600">
          Plantillas profesionales para comunicación con usuarios
        </p>
      </div>

      <div className="grid gap-6">
        {/* Plantilla de Confirmación de Recepción */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Confirmación de Recepción de Solicitud
                </CardTitle>
                <CardDescription>
                  Plantilla profesional para confirmar la recepción de solicitudes de usuarios
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Profesional</Badge>
                <Badge className="bg-green-500">Activa</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Vista previa */}
              <div className="bg-slate-50 p-6 rounded-lg border-2 border-dashed border-slate-300">
                <div className="text-sm text-slate-600 mb-2 font-medium">Vista previa:</div>
                <div className="bg-white p-4 rounded border shadow-sm max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 font-mono">
                    {plantillaConfirmacion}
                  </pre>
                </div>
              </div>

              {/* Variables disponibles */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Variables disponibles:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[NOMBRE_SOLICITANTE]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[NUMERO_SOLICITUD]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[FECHA_RECEPCION]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[TIPO_SOLICITUD]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[TIEMPO_RESPUESTA]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[TELEFONO_CONTACTO]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[EMAIL_CONTACTO]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[HORARIO_ATENCION]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[NOMBRE_FUNCIONARIO]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[CARGO]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[NOMBRE_INSTITUCION]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[DIRECCION]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[EMAIL_INSTITUCIONAL]</code>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button 
                  onClick={() => copyToClipboard(plantillaConfirmacion)}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Plantilla
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info("Función de previsualización en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Vista Previa
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info("Función de descarga en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => toast.info("Función de envío en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Prueba
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card>
          <CardHeader>
            <CardTitle>Instrucciones de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Las variables entre corchetes [VARIABLE] deben ser reemplazadas con los datos reales antes del envío.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Esta plantilla cumple con estándares profesionales de comunicación institucional.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Se recomienda personalizar los datos de contacto según la institución correspondiente.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>La plantilla incluye secciones claramente delimitadas para facilitar la lectura.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
